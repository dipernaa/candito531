const apiController = require('../controllers/api');
const { sendError, sendSuccess } = require('../utils/response');

module.exports = (app, pool) => {
  app.post('/api/login', (req, res) => {
    let loginPromise;
    if (req.body && req.body.email && req.body.password) {
      loginPromise = apiController.login(pool, req.body.email, req.body.password);
    } else {
      loginPromise = Promise.reject({
        status: 400,
        payload: {
          data: {
            message: 'Missing Credentials!'
          }
        }
      });
    }

    loginPromise
      .then((result) => {
        sendSuccess(res, result);
      })
      .catch((errResult) => {
        sendError(res, errResult);
      });
  });
};

