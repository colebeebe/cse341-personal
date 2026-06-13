export default `#graphql
  type Book {
    _id: ID!
    name: String!
    publicationYear: Int!
    publisher: String!
    genres: [String!]!
    format: String!
    pageCount: Int!
    author: Author!
  }
  type Author {
    _id: ID!
    firstName: String!
    lastName: String!
    birthCountry: String!
    birthdate: String!
    books: [Book!]
  }
  type DeleteResult {
    success: Boolean!
    message: String
  }
  type Query {
    books: [Book!]!
    authors: [Author!]!
    book(id: ID!): Book!
    author(id: ID!): Author!
  }
  type Mutation {
    addBook(book: AddBookInput!): Book!
    addAuthor(author: AddAuthorInput!): Author!
    deleteBook(id: ID!): DeleteResult!
    deleteAuthor(id: ID!): DeleteResult!
  }
  input AddBookInput {
    name: String!
    publicationYear: Int!
    publisher: String!
    genres: [String!]!
    format: String!
    pageCount: Int!
    authorId: String!
  }
  input AddAuthorInput {
    firstName: String!
    lastName: String!
    birthCountry: String!
    birthdate: String!
  }
`;
