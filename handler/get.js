const { getItem } = require('./lib/dynamodb');

module.exports.handler = async (event) => {
  const { key } = event.pathParameters;
  const res = await getItem('shorten_url', key);
  const { url } = res.Item;

  return {
    statusCode: 302,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain',
      Location: url,
    },
    body: `Redirect to: ${url}`,
  };
};
