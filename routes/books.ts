const {
  rejectUnkownFields,
  fullValidation,
  optionalValidation,
} = require('../middleware/validators.ts');

const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  patchBook,
  deleteBook,
} = require('../controllers/books');

/**
 * Base route: /books
 */
const bookRouter = require('express').Router();

bookRouter.get('/', getAllBooks);
bookRouter.get('/:id', getBookById);

bookRouter.post('/', rejectUnkownFields, fullValidation, createBook);

bookRouter.put('/:id', rejectUnkownFields, fullValidation, updateBook);

bookRouter.patch('/:id', rejectUnkownFields, optionalValidation, patchBook);

bookRouter.delete('/:id', deleteBook);

module.exports = bookRouter;
