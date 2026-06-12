import { ObjectId } from 'mongodb';
import {
  getAllBooks,
  getOneBook,
  getBooksByAuthorId,
} from '../../controllers/books.js';
import { getAllAuthors, getOneAuthor } from '../../controllers/authors.js';

type BookArgs = {
  id: string;
  authorId: ObjectId;
};

type AuthorArgs = {
  id: string;
  _id: ObjectId;
};

export default {
  Query: {
    books: getAllBooks,
    authors: getAllAuthors,

    book(_: unknown, { id }: BookArgs) {
      return getOneBook(id);
    },

    author(_: unknown, { id }: AuthorArgs) {
      return getOneAuthor(id);
    },
  },
  Book: {
    author({ authorId }: BookArgs) {
      const id = authorId.toString();
      return getOneAuthor(id);
    },
  },
  Author: {
    books({ _id }: AuthorArgs) {
      const id = _id.toString();
      return getBooksByAuthorId(id);
    },
  },
};
