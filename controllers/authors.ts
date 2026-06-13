import { ObjectId } from 'mongodb';
import getDB from '../models/db.js';

type Author = {
  firstName: string;
  lastName: string;
  birthCountry: string;
  birthdate: string;
};

export const getAllAuthors = async () => {
  try {
    const db = getDB();
    const collection = db.collection('authors');
    const authors = await collection.find({}).toArray();

    authors.forEach((a: any) => {
      a.birthdate = a.birthdate.toISOString();
    });

    return authors;
  } catch (err: any) {
    return err;
  }
};

export const getOneAuthor = async (id: string) => {
  try {
    const db = getDB();
    const collection = db.collection('authors');
    const author = await collection.findOne(new ObjectId(id));

    author.birthdate = author.birthdate.toISOString();

    return author;
  } catch (err: any) {
    return err;
  }
};

export const createNewAuthor = async (author: Author) => {
  try {
    const { birthdate, ...copy } = author;
    const newAuthor = { birthdate: new Date(birthdate), ...copy };

    const db = getDB();
    const collection = db.collection('authors');
    await collection.insertOne(newAuthor);

    return author;
  } catch (err: any) {
    return err;
  }
};
