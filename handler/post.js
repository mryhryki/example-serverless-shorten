const crypto = require('crypto');
const { putItem } = require('./lib/dynamodb');

module.exports.handler = async (event) => {
  const { Origin } = event.headers;
  const json = JSON.parse(event.body);
  const { url } = json;
  const key = crypto.randomBytes(10).toString('base64').replace(/[+/]/g, '').substr(0, 5);
  await putItem('shorten_url', key, { url });
  const payload = {
    url: `${Origin}/${key}`,
  };

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/html',
    },
    body: JSON.stringify(payload),
  };
};
