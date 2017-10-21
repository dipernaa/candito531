const { queries } = require('../schema');
const { query } = require('../../server/utils/database');

const setupDatabase = (connection) => (
  query(connection, { sql: queries.database.drop })
    .catch(() => {
      console.log('initial setup of database');
    })
    .then(() => query(connection, { sql: queries.database.create }))
    .then(() => query(connection, { sql: queries.database.use }))
    .then(() => query(connection, { sql: queries.tables.users }))
    .then(() => query(connection, { sql: queries.tables.lifts }))
    .then(() => query(connection, { sql: queries.tables.weeks }))
    .then(() => query(connection, { sql: queries.tables.days }))
    .then(() => {
      console.log('database successfully setup');
    })
);

module.exports = setupDatabase;
