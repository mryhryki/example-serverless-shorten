const { DynamoDB } = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const { DocumentClient } = DynamoDB;
const client = new DocumentClient({ apiVersion: '2012-10-08', region: 'ap-northeast-1' });

const getItem = async (resource, key) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: { resource, key },
  };
  return client.get(params).promise();
};

const getItems = async (resource, condition, expression = 'begins_with') => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    ExpressionAttributeNames: { '#resource': 'resource', '#key': 'key' },
    ExpressionAttributeValues: { ':resource': resource, ':condition': condition },
    KeyConditionExpression: `#resource = :resource AND ${expression}(#key, :condition)`,
  };
  const result = await client.query(params).promise();
  return result.Items;
};

const putItem = async (resource, key, item = {}) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      resource,
      key,
      ...item,
    },
  };
  const result = await client.put(params).promise();
  return result;
};

module.exports = {
  getItem,
  getItems,
  putItem,
};
