const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoPass = process.env.MONGOPASS;
const mongoUser = process.env.MONGOUSER;
const uri = `mongodb+srv://${mongoUser}:${mongoPass}@pintel-db-test.urzj9hc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });

let db;

async function connectToDatabase() {
  await client.connect();
  console.log('Connected to MongoDB');
  db = client.db('Pintel');
}

module.exports = {
  connectToDatabase,
  getDb: function() {
    return db;
  }
};
