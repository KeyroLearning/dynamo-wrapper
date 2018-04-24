'use strict';
const AWSDK = require('aws-sdk')
const AWSXRay = require('aws-xray-sdk')

const AWS = AWSXRay.captureAWS(AWSDK)
const dynamoDb = new AWS.DynamoDB.DocumentClient()

exports.scan = (params) => {
  return new Promise((resolve, reject) =>
    dynamoDb.scan(params).promise()
      .then(data => resolve(data.Items))
      .catch(err => reject(err)),
  )
}

exports.get = (params) => {
  return new Promise((resolve, reject) =>
    dynamoDb.get(params).promise()
      .then(data => resolve(data.Item))
      .catch(err => reject(err)),
  )
}

exports.createItem = (params) => {
  return new Promise((resolve, reject) =>
    dynamoDb.put(params).promise()
      .then(() => resolve(params.Item))
      .catch(err => reject(err)),
  )
}

exports.updateItem = (params, args) => {
  return new Promise((resolve, reject) =>
    dynamoDb.update(params).promise()
      .then(() => resolve(args))
      .catch(err => reject(err)),
  )
}

exports.deleteItem = (params, args) => {
  return new Promise((resolve, reject) =>
    dynamoDb.delete(params).promise()
      .then(() => resolve(args))
      .catch(err => reject(err)),
  )
}