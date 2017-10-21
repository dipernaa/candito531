const sendError = (res, errResult = {}) => {
  res.status(errResult.status || 500).send(errResult.payload || {
    data: {
      message: 'Server Error!'
    }
  });
};

const sendSuccess = (res, result = {}) => {
  res.status(result.status || 200).send(result.payload || {
    data: {
      message: 'Success!'
    }
  });
};

module.exports = {
  sendError,
  sendSuccess
};
