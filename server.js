const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql');
const path = require('path');
const app = express();
const { databaseName } = require('./database/schema');

if (process.env.NODE_ENV !== 'production') {
  dotenv.load();
}

const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json());

const pool = mysql.createPool({
  connectionLimit : 10,
  database: databaseName,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

// Routes
require('./server/routes/api')(app, pool);

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

const server = app.listen(PORT, err => {
  if (err) {
    throw err;
  }

  console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});

module.exports = server;
