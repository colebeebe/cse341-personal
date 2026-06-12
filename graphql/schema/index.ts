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
    books: [Book!]
  }
  type Query {
    books: [Book!]!
    authors: [Author!]!
    book(id: ID!): Book!
    author(id: ID!): Author!
  }
`;
