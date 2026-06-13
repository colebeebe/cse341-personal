import { ObjectId } from 'mongodb';
import {
  getAllBooks,
  getOneBook,
  getBooksByAuthorId,
  createNewBook,
  deleteBookResource,
} from '../controllers/books.js';
import {
  getAllAuthors,
  getOneAuthor,
  createNewAuthor,
  deleteAuthorResource,
} from '../controllers/authors.js';

type BookArgs = {
  id: string;
  authorId: ObjectId;
};

type AuthorArgs = {
  id: string;
  _id: ObjectId;
};

type Book = {
  book: {
    name: string;
    publicationYear: number;
    publisher: string;
    genres: string[];
    format: string;
    pageCount: string;
    authorId: string;
  };
};

type Author = {
  author: {
    firstName: string;
    lastName: string;
    birthCountry: string;
    birthdate: string;
  };
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

  Mutation: {
    addBook(_: unknown, { book }: Book) {
      return createNewBook(book);
    },

    addAuthor(_: unknown, { author }: Author) {
      return createNewAuthor(author);
    },

    deleteBook(_: unknown, { id }: BookArgs) {
      return deleteBookResource(id);
    },

    deleteAuthor(_: unknown, { id }: AuthorArgs) {
      return deleteAuthorResource(id);
    },
  },
};
