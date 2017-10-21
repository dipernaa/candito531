const getAsync = (endpoint) => (
  fetch(endpoint)
    .then(handleResponse)
);

const postAsync = (endpoint, data) => (
  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(handleResponse)
);

const handleResponse = (response) => (
  response.json().then(json => {
    if (response.ok) {
      return json;
    }

    return Promise.reject({
      statusCode: response.status,
      ...json
    });
  })
);

export default {
  getAsync,
  postAsync
};
