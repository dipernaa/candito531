const bcrypt = require('bcrypt');
const { tables } = require('../../database/schema');
const { getPoolConnection, query } = require('../utils/database');

const login = (pool, email, password) => (
  getPoolConnection(pool)
    .then((connection) => (
      query(connection, {
        sql:
          `SELECT
          ${tables.users.select('usersTable')}, usersTable.password
          FROM \`${tables.users.name}\` as usersTable
          WHERE usersTable.email = ?`,
        values: [email]
      })
        .then((queryResult) => {
          connection.release();
          return queryResult;
        })
        .catch((err) => {
          connection.release();
          return Promise.reject(err);
        })
    ))
    .then((queryResult) => {
      if (!queryResult || !queryResult.length) {
        return Promise.reject({
          status: 401,
          payload: {
            data: {
              message: 'Incorrect Credentials!'
            }
          }
        });
      }

      const foundUser = queryResult[0];
      return bcrypt.compare(password, foundUser.password)
        .then((authenticationResult) => {
          if (!authenticationResult) {
            return Promise.reject({
              status: 401,
              payload: {
                data: {
                  message: 'Incorrect Credentials!'
                }
              }
            });
          }

          const result = Object.assign({}, foundUser, {
            password: null
          });

          return {
            status: 200,
            payload: {
              data: {
                user: result
              }
            }
          };
        });
    })
);

module.exports = {
  login
};
