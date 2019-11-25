const { DynamoDB } = require('aws-sdk');

// DynamoDB のクライアントの設定
const client = new DynamoDB.DocumentClient({ apiVersion: '2012-10-08', region: 'ap-northeast-1' });

module.exports.handler = async (event) => {
  const { key } = event.pathParameters;

  // キーに該当するURLを取得する
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: { key },
  };
  const res = await client.get(params).promise();

  // 該当するURLが見つからない場合は404を返却する
  if (!res || !res.Item || !res.Item.url) {
    return {
      statusCode: 404,
      headers: { 'Content-Type': 'text/plain' },
      body: '404 Not Found',
    };
  }

  // 該当のURLにリダイレクトさせる
  const { url } = res.Item;
  return {
    statusCode: 302,
    headers: {
      'Content-Type': 'text/plain',
      Location: url,
    },
    body: `Redirect to: ${url}`,
  };
};
