const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017'
async function dbConnect(collection) {
  const client = new MongoClient(url)
  const db = client.db('ecommerce')
  if (collection == 'users') {
    var collection = db.collection('users')
    return collection
  } else if (collection == 'orders') {
    var collection = db.collection('orders')
    return collection
  } else if (collection == 'carts') {
    var collection = db.collection('carts')
    return collection
  }
}
module.exports = dbConnect;
