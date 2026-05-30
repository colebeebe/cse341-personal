import { Router } from 'express';
import {
  rejectUnkownFields,
  fullValidation,
  optionalValidation,
} from '../../middleware/validators.js';
import {
  getBooks,
  getBookById,
  createBook,
  editBook,
  deleteBook,
} from './controller.js';

const router = Router();

router.get('/', getBooks);
router.get('/:id', getBookById);

router.post('/', rejectUnkownFields, fullValidation, createBook);

router.put('/:id', rejectUnkownFields, optionalValidation, editBook);

router.delete('/:id', deleteBook);

export default router;
