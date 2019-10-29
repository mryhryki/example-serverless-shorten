const { v4: uuid } = require('uuid');
const { putItem } = require('./lib/dynamodb');

module.exports.handler = async (event) => {
  const { Origin } = event.headers;
  const { url } = JSON.parse(event.body);
  const key = uuid();
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
