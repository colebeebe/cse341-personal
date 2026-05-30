import { Router } from 'express';
import {
  rejectUnkownFields,
  fullValidation,
  optionalValidation,
} from '../../middleware/validators.js';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  patchBook,
  deleteBook,
} from './controller.js';

/**
 * Base route: /books
 */
const router = Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);

router.post('/', rejectUnkownFields, fullValidation, createBook);

router.put('/:id', rejectUnkownFields, fullValidation, updateBook);

router.patch('/:id', rejectUnkownFields, optionalValidation, patchBook);

router.delete('/:id', deleteBook);

export default router;
