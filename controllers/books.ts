import { ObjectId } from 'mongodb';
import getDB from '../models/db.js';

export const getAllBooks = async () => {
  try {
    const db = getDB();
    const collection = db.collection('books');
    const books = await collection.find({}).toArray();

    return books;
  } catch (err) {
    return err;
  }
};

export const getOneBook = async (id: string) => {
  try {
    const db = getDB();
    const collection = db.collection('books');
    const book = await collection.findOne(new ObjectId(id));

    return book;
  } catch (err) {
    return err;
  }
};

export const getBooksByAuthorId = async (id: string) => {
  try {
    const db = getDB();
    const collection = db.collection('books');
    const books = await collection
      .find({ authorId: new ObjectId(id) })
      .toArray();

    return books;
  } catch (err) {
    return err;
  }
};
