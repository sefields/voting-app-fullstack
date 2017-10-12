// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;
var session = require('express-session');

require('dotenv').config();

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var user = null;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  passReqToCallback:true
  },
  function(request, accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      return done(null, profile);  
    });
  }
));

//  Configure MongoDB
var dbURL = process.env.MONGO_URI;

var app = express();
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyParser.json())

//  Allow access from the front end, avoid CORS
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "https://late-night-react-sefields.c9users.io");
  next();
});

app.use(session({ 
  secret: 'whatever',
  resave: true, 
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", function(req, res, next) {
  if (req.user) {
    user = req.user;
    console.log(user);
  }
  next();
});

//app.use("/", express.static('proj-late/build'));

app.get('/auth/google', passport.authenticate('google', {scope: [
  'https://www.googleapis.com/auth/plus.login',
  'https://www.googleapis.com/auth/plus.profile.emails.read']
}));

app.get('/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/',
    failureRedirect: 'https://google.com'
  }));
  
app.get("/getuser", function(req, res) {
  if (user) {
    res.send(user);
  }
  else {
    res.send(null);
  }
});

app.get("/getpolls", function(req, res) {
  mongo.connect(dbURL, function(err, db) {
    if (err) throw err;
    var pollCollection = db.collection("polls");
    //  This find query should grab all documents
    pollCollection.find({}, { _id : 0 }).toArray(function(err, docs) {
      if (err) throw err;
      res.send(docs);
      db.close();
    });
  });
});

app.post("/writepoll", function(req, res) {
  var payloadPoll = req.body;
  //  Add the new poll to the database
  mongo.connect(dbURL, function(err, db) {
    if (err) throw err;
    var pollCollection = db.collection("polls");
    pollCollection.insert(payloadPoll);
    db.close();
  });
});

//  CastVote route does the following:
//  1. Update a document in place with a new voteArr
//  2. When the step above is finished, return all polls
//  Why: The database is our source of truth.
//  Once a set of polls is delivered to the app,
//  it divides things up from there (i.e. based on User)
app.post("/castvote", function(req, res) {
  var payloadPoll = req.body;
  mongo.connect(dbURL, function(err, db) {
    if (err) throw err;
    var pollCollection = db.collection("polls");
    //  Update, in place, the poll that we've voted on.
    pollCollection.update({ "question" : payloadPoll.question },
                          { $set : { voteArr : payloadPoll.voteArr} }
                          , function() { // When the update completes, return the new set of polls
                              pollCollection.find({}, { _id : 0 }).toArray(function(err, docs) {
                                if (err) throw err;
                                res.send(docs);
                                db.close();
                              });
                          } );
  });
});

app.post("/deletepoll", function(req, res) {
  var payloadPoll = req.body;
  mongo.connect(dbURL, function(err, db) {
    if (err) throw err;
    var pollCollection = db.collection("polls");
    pollCollection.deleteOne({ "question" : payloadPoll.question });
    db.close();
  });
});

// listen for requests :)
var listener = app.listen(8081, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
