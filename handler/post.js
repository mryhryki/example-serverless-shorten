const crypto = require('crypto');
const { DynamoDB } = require('aws-sdk');

// DynamoDB のクライアントの設定
const client = new DynamoDB.DocumentClient({ apiVersion: '2012-10-08', region: 'ap-northeast-1' });

module.exports.handler = async (event) => {
  const { Origin } = event.headers;
  const { url } = JSON.parse(event.body);

  // URLをチェックして、不正なURLの場合は400を返却する
  if (!url.match(/^(http|https):\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/g)) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'ERROR: Invalid URL.' }),
    };
  }

  // ランダムなキーを生成する
  const key = crypto.randomBytes(10).toString('base64').replace(/[+/]/g, '').substr(0, 5);

  // DynamoDB にキーとURL情報を保存する
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: { key, url },
  };
  await client.put(params).promise();

  // 短縮したURLを返却する
  const payload = {
    url: `${Origin}/${key}`,
  };
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };
};
