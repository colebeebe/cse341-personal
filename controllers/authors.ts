import { Request, Response } from 'express';
import getDB from '../models/db.js';
import ObjectId from 'mongodb';
import { validationResult } from 'express-validator';

/**
 * @description Get a list of all authors
 * @route GET /authors
 */
export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const db = getDB();
    const collection = db.collection('authors');
    const authors = await collection.find({}).toArray();

    res.status(200).json(authors);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    }
    res.status(500).json({ error: String(err) });
  }
};

/**
 * @description Create a new author resource
 * @route POST /authors
 */
export const createAuthor = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const db = getDB();
    const collection = db.collection('authors');

    const author = req.body;
    const birhtdate = new Date(author.birthdate);
    delete author.birthdate;
    author.birthdate = birhtdate;

    await collection.insertOne(author);

    res.status(201).json(req.body);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    }
    res.status(500).json({ error: String(err) });
  }
};
