import { MongoClient } from 'mongodb';

const uri: string = process.env.MONGO_URI || '';

const client = new MongoClient(uri);

let db: any = null;

export const connectDB = async () => {
  try {
    await client.connect();

    db = client.db('cse341-personal');
    console.log('Successfully connected to database');
  } catch (err) {
    console.error(err);
  }
};

export default () => db;
