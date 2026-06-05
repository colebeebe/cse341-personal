import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';

/**
 * @description Allowed fields in a given book resource
 */
const allowed = [
  'name',
  'publicationYear',
  'publisher',
  'author',
  'genres',
  'format',
  'pageCount',
];

/**
 * @description: Middleware to prevent adding fields that don't belong to a book resource
 */
export const rejectUnknownFields = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const unknown = Object.keys(req.body).filter((key) => !allowed.includes(key));

  if (unknown.length > 0) {
    return res.status(400).json({
      error: `Unknown fields: ${unknown.join(', ')}`,
    });
  }

  next();
};

/**
 * @description: Validation asserting that all fields must be present
 */
export const fullValidation = [
  body('name').trim().notEmpty().withMessage('Name must not be empty'),
  body('publicationYear')
    .isInt()
    .withMessage('Year must be a number')
    .toInt()
    .isLength({ max: 4 })
    .withMessage('Year must be at most 4 digits long'),
  body('publisher')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Publisher must not be empty'),
  body('author')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Author name must not be empty'),
  body('genres')
    .isArray({ min: 1 })
    .withMessage('Genres should be a list with at least one genre'),
  body('genres.*').trim().notEmpty().withMessage('No genre should be empty'),
  body('format')
    .trim()
    .isIn([
      'paperback',
      'hardcover',
      'ebook',
      'audiobook',
      'board book',
      'graphic novel',
    ])
    .withMessage('Incorrect format type'),
  body('pageCount').isInt().withMessage('Page count must be a number').toInt(),
];

/**
 * @description Validation for PATCH (fields are otptional)
 */
export const optionalValidation = [
  body('name')
    .trim()
    .optional({ checkFalsy: true })
    .notEmpty()
    .withMessage('Name must not be empty'),
  body('publicationYear')
    .optional({ checkFalsy: true })
    .isInt()
    .withMessage('Year must be a number')
    .toInt()
    .isLength({ max: 4 })
    .withMessage('Year must be at most 4 digits long'),
  body('publisher')
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage('Publisher must not be empty'),
  body('author')
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage('Author name must not be empty'),
  body('genres')
    .optional({ checkFalsy: true })
    .isArray({ min: 1 })
    .withMessage('Genres should be a list with at least one genre'),
  body('genres.*').trim().notEmpty().withMessage('No genre should be empty'),
  body('format')
    .trim()
    .optional({ checkFalsy: true })
    .isIn([
      'paperback',
      'hardcover',
      'ebook',
      'audiobook',
      'board book',
      'graphic novel',
    ])
    .withMessage('Incorrect format type'),
  body('pageCount')
    .optional({ checkFalsy: true })
    .isInt()
    .withMessage('Page count must be a number')
    .toInt(),
];
