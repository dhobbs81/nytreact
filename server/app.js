// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// parse application/json
app.use(bodyParser.json());

app.post('/saved', (req, res) => {
  //const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  //console.log("Got post request from ")
  var results = JSON.parse(req.body.results);

  for (var i = 0; i < results.length; i++) {
    console.log(results[i]);
  }

  res.send(JSON.stringify(results));
});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;