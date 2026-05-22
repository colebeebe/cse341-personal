import { getDB } from '../models/db.js';

export const getMovies = async (req, res) => {
  const db = getDB();
  const collection = db.collection('movies');
  const items = await collection.find({}).toArray();

  res.send(items);
};

export const postMovie = async (req, res) => {
  const db = getDB();
  const collection = db.collection('movies');
  await collection.insertOne(req.body);
  res.send(req.body);
};
