// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;
var session = require('express-session');

//  Configure MongoDB
require('dotenv').config();
var dbURL = process.env.MONGO_URI;

//  Configure Passport
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
passport.use(new Strategy({
  consumerKey : process.env.TWITTER_KEY,
  consumerSecret : process.env.TWITTER_SECRET,
  callbackURL : process.env.TWITTER_CALLBACK_URL
}, function(token, tokenSecret, profile, callback) {
  return callback(null, profile);
}));

passport.serializeUser(function(user, callback) {
  callback(null, user);
});

passport.deserializeUser(function(obj, callback) {
  callback(null, obj);
});

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

app.use(session({ secret: 'whatever', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

//  Watch this: https://www.youtube.com/watch?v=_6QrV5pneSY
app.get("/", function(req, res) {
  console.log("user" + req.user);
});

app.get("/twitter/login", passport.authenticate('twitter'));

app.get("/twitter/return", passport.authenticate('twitter', {
  failureRedirect: 'https://late-night-react-sefields.c9users.io'
}), function (req, res) {
  res.redirect('https://late-night-react-sefields.c9users.io');
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

app.post("/castvote", function(req, res) {
  var payloadPoll = req.body;
  mongo.connect(dbURL, function(err, db) {
    if (err) throw err;
    var pollCollection = db.collection("polls");
    pollCollection.replaceOne({ "question" : payloadPoll.question }, payloadPoll);
    db.close();
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
