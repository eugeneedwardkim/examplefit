const request = require('request');

const { SPOONTACULAR_BASE_URL, X_MASHAPE_KEY } = process.env;

const client = (endpoint, opts = { method: 'GET', query: {} }, cb ) => {
  let { query, method } = opts;
  let options = {
    uri: `${SPOONTACULAR_BASE_URL}/${endpoint}`,
    qs: { query },
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'X-Mashape-Key': X_MASHAPE_KEY
    },
    json: true
  }

  request(options, (err, res, body) => {
    return cb(err, body)
  })
}

module.exports = client;