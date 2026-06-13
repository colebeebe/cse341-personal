import { ObjectId } from 'mongodb';
import getDB from '../models/db.js';

type Book = {
  name: string;
  publicationYear: number;
  publisher: string;
  genres: string[];
  format: string;
  pageCount: string;
  authorId: string;
};

export const getAllBooks = async () => {
  try {
    const db = getDB();
    const collection = db.collection('books');
    const books = await collection.find({}).toArray();

    return books;
  } catch (err: any) {
    return err;
  }
};

export const getOneBook = async (id: string) => {
  try {
    const db = getDB();
    const collection = db.collection('books');
    const book = await collection.findOne(new ObjectId(id));

    if (!book) {
      throw new Error('Book not found');
    }

    return book;
  } catch (err: any) {
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
  } catch (err: any) {
    return err;
  }
};

export const createNewBook = async (book: Book) => {
  try {
    const { authorId, ...copy } = book;
    const newBook = { authorId: new ObjectId(authorId), ...copy };

    const db = getDB();
    const collection = db.collection('books');
    await collection.insertOne(newBook);

    return book;
  } catch (err: any) {
    return err;
  }
};

export const deleteBookResource = async (id: string) => {
  try {
    const db = getDB();
    const collection = db.collection('books');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    return {
      success: result.deletedCount === 1,
      message:
        result.deletedCount === 1 ? 'Resource deleted' : 'Book not found',
    };
  } catch (err: any) {
    return err;
  }
};
