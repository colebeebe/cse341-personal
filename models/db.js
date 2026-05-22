import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let db = null;

export const connectDB = async () => {
  try {
    await client.connect();

    db = client.db('cse341-personal');
    console.log('Successfully connected to database');
  } catch (err) {
    console.error(err);
  }
};

export const getDB = () => db;
