import { Request, Response, NextFunction } from 'express';
import getDB from '../models/db.js';
import { ObjectId } from 'mongodb';
import { validationResult } from 'express-validator';

type BookParams = {
  id: string;
};

/**
 * @description Get a list of all books
 * @route GET /books
 */
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const db = getDB();
    const collection = db.collection('books');
    let books = await collection.find({}).toArray();

    res.status(200).json(books);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    }
    res.status(500).json({ error: String(err) });
  }
};

/**
 * @description Get a single book
 * @route GET /books/:id
 */
export const getBookById = async (req: Request<BookParams>, res: Response) => {
  try {
    const db = getDB();
    const collection = db.collection('books');
    let book = await collection.findOne({ _id: new ObjectId(req.params.id) });

    if (!book) {
      res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    }
    res.status(500).json({ error: String(err) });
  }
};

/**
 * @description Create a new book resource
 * @route POST /books
 */
export const createBook = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const db = getDB();
    const collection = db.collection('books');
    await collection.insertOne(req.body);

    res.status(201).json(req.body);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    }
    res.status(500).json({ error: String(err) });
  }
};

/**
 * @description Update a book (by sending an entire book object)
 * @route PUT /books/:id
 */
export const updateBook = async (req: Request<BookParams>, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const bookId = new ObjectId(req.params.id);
    const db = getDB();
    const collection = db.collection('books');

    const result = await collection.updateOne(
      { _id: bookId },
      { $set: req.body },
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json(req.body);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    }
    res.status(500).json({ error: String(err) });
  }
};

/**
 * @description Update a book (by sending part of a book resource)
 * @route PATCH /books/:id
 */
export const patchBook = async (req: Request<BookParams>, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const fields = [
    'name',
    'publicationYear',
    'publisher',
    'author',
    'genres',
    'format',
    'pageCount',
  ];

  const updates: Record<string, any> = {};

  for (const field of fields) {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  }

  try {
    const bookId = new ObjectId(req.params.id);
    const db = getDB();
    const collection = db.collection('books');

    const result = await collection.updateOne(
      { _id: bookId },
      { $set: updates },
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const book = await collection.findOne({ _id: bookId });

    res.status(200).json(book);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    }
    res.status(500).json({ error: String(err) });
  }
};

/**
 * @description Delete a book
 * @route DELETE /books/:id
 */
export const deleteBook = async (req: Request<BookParams>, res: Response) => {
  try {
    const db = getDB();
    const collection = db.collection('books');

    const result = await collection.deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(204).send();
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    }
    res.status(500).json({ error: String(err) });
  }
};
