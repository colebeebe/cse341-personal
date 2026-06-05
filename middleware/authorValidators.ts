import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';

/**
 * @description Allowed fields in a given author resource
 */
const allowed = ['firstName', 'lastName', 'birthdate', 'birthCountry'];

/**
 * @description Middleware to prevent adding fields that don't belong to an author resource
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
 * @description Author alidation
 */
export const validation = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name must not be empty'),
  body('lastName').trim().notEmpty().withMessage('Last name must not be empty'),
  body('birthdate')
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage('Birthdate must be ISO date'),
  body('birthCountry').optional({ checkFalsy: true }).trim(),
];
