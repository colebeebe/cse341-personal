import { getDB } from '../../models/db.js';
import { ObjectId } from 'mongodb';
import { validationResult } from 'express-validator';

/**
 * Get a list of every book
 * GET /books
 */
export const getAllBooks = async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection('books');
    let books = await collection.find({}).toArray();

    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

/**
 * Get a single book
 * GET /books/:id
 */
export const getBookById = async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection('books');
    const book = await collection.findOne({ _id: new ObjectId(req.params.id) });

    if (!book) {
      res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

/**
 * Create a new book resource
 * POST /books
 */
export const createBook = async (req, res) => {
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
    res.status(500).json({ error: err.toString() });
  }
};

/**
 * Update a book (by sending an entire book object)
 * PUT /books/:id
 */
export const updateBook = async (req, res) => {
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
    res.status(500).json({ error: err.toString() });
  }
};

/**
 * Update a book (by sending a single attribute)
 * PATCH /books/:id
 */
export const patchBook = async (req, res) => {
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
  const updates = {};

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
    res.status(500).json({ error: err.toString() });
  }
};

/**
 * Delete a book
 * DELETE /books/:id
 */
export const deleteBook = async (req, res) => {
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
    res.status(500).json({ error: err.toString() });
  }
};
