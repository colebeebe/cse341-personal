import { getDB } from '../models/db.js';

export const getBooks = async (req, res) => {
  const db = getDB();
  const collection = db.collection('books');
  const items = await collection.find({}).toArray();

  res.send(items);
};

export const postBook = async (req, res) => {
  const db = getDB();
  const collection = db.collection('books');
  await collection.insertOne(req.body);
  res.send(req.body);
};
