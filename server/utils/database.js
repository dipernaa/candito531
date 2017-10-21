const getPoolConnection = (pool) => (
  new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
      }
    });
  })
);

const query = (connection, queryObj) => (
  new Promise((resolve, reject) => {
    connection.query(queryObj, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  })
);

module.exports = {
  getPoolConnection,
  query
};
