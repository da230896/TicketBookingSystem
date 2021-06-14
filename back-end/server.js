'use strict';

// [START app]
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Node.js!');
});

// Listen to 8080 
// process.env.PORT
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
// [END app]

module.exports = app;