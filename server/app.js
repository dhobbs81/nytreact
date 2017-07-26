// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

// get mongoose article schema to handle end points
const Article = require('./article');

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// parse application/json
app.use(bodyParser.json());

// Receive POST and save data to mongo
app.post('/saved', (req, res) => {
  //const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  //console.log("Got post request from ")
  var results = JSON.parse(req.body.results);

  // Loop through the received json and create Articles
  for (var i = 0; i < results.length; i++) {
    var article = new Article(results[i]);
    article.save(function(error, doc){
      if(error){
        console.log(error);
      }
      else{
        console.log(doc);
      }
    });
  }

  // Tell the client we were successful
  res.send('null');
  res.status(201).end();
});

// Receive GET and send back data fetched from mongo
app.get("/saved", function(req, res) {
  Article.find({}).exec(function(err, doc) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    else {
      res.send(doc);
    }
  });
});

/*
app.delete("/saved", function(req, res) {
  Article.remove({ url: req.body.url }, function(err) {
    if (err) {
      res.send(err);
    }
    else {
      res.send("Removed article");
    }
  });
});
*/

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;