import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { connectDB } from './models/db.js';

import typeDefs from './graphql/schema/index.js';
import resolvers from './graphql/resolvers/index.js';

connectDB();

const PORT = Number(process.env.PORT) || 3000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
  // context: async ({ req }) => {
  //   const auth = req.headers.authorization;

  //   if (!auth || !auth.startsWith('Bearer ')) {
  //     throw new Error('Not authenticated');
  //   }

  //   const token = auth.replace('Bearer ', '');

  //   // TODO: Verify OAuth token here
  //   return {};
  // },
});

console.log(`Listening at http://localhost:${PORT}`);
