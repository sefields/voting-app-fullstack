// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');

var mongo = require('mongodb').MongoClient;

require('dotenv').config();
var dbURL = process.env.MONGO_URI;

var app = express();
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "https://late-night-react-sefields.c9users.io");
  next();
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
  console.log(payloadPoll);
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

// listen for requests :)
var listener = app.listen(8081, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
