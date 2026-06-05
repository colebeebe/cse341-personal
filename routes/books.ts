import { Router } from 'express';

import {
  rejectUnknownFields,
  fullValidation,
  optionalValidation,
} from '../middleware/bookValidators.js';

import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  patchBook,
  deleteBook,
} from '../controllers/books.js';

const router = Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);

router.post('/', rejectUnknownFields, fullValidation, createBook);

router.put('/:id', rejectUnknownFields, fullValidation, updateBook);

router.patch('/:id', rejectUnknownFields, optionalValidation, patchBook);

router.delete('/:id', deleteBook);

export default router;
