import { ObjectId } from 'mongodb';
import getDB from '../models/db.js';

export const getAllAuthors = async () => {
  try {
    const db = getDB();
    const collection = db.collection('authors');
    const authors = await collection.find({}).toArray();

    return authors;
  } catch (err) {
    return err;
  }
};

export const getOneAuthor = async (id: string) => {
  try {
    const db = getDB();
    const collection = db.collection('authors');
    const author = await collection.findOne(new ObjectId(id));

    return author;
  } catch (err) {
    return err;
  }
};
