// server/index.js
'use strict';

const app = require('./app');
const mongoose = require('./db');

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});