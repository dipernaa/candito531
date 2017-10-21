const dotenv = require('dotenv');
const mysql = require('mysql');
const setupDatabase = require('./setupDatabase');
const seedDatabase = require('./seedDatabase');

dotenv.load();
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

setupDatabase(connection)
  .then(() => seedDatabase(connection))
  .then(() => {
    connection.end();
  })
  .catch((err) => {
    console.log('ERROR');
    console.log(err);
    connection.end();
  });
