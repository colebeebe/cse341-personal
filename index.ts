import express from 'express';
import { ApolloServer } from '@apollo/server';

import { connectDB } from './models/db.js';
import { toHeaderMap } from './utils/helpers.js';

import typeDefs from './graphql/schema/index.js';
import resolvers from './graphql/resolvers/index.js';

const PORT = Number(process.env.PORT) || 3000;
const NODE_ENV = String(process.env.NODE_ENV) || 'production';

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

app.use(express.json());

app.get('/health', (req, res) => {
  res.send('OK');
});

app.use('/graphql', async (req, res) => {
  const headers = toHeaderMap(req.headers);
  const response = await server.executeHTTPGraphQLRequest({
    context: async () => ({}),
    httpGraphQLRequest: {
      method: req.method,
      headers,
      body: req.body,
      search: req.url.split('?')[1] ?? '',
    },
  });

  for (const [key, value] of response.headers) {
    res.setHeader(key, value);
  }

  if (response.body.kind === 'complete') {
    res.status(response.status || 200).send(response.body.string);
  } else {
    res.setHeader('Content-Type', 'multipart/mixed; boundary="-"');

    for await (const chunk of response.body.asyncIterator) {
      res.write(chunk);
    }

    res.end();
  }
});

app.listen(PORT, () => {
  connectDB();
  if (NODE_ENV.includes('dev')) {
    console.log(`Listening on http://localhost:${PORT}`);
  } else {
    console.log(`Listening on port ${PORT}`);
  }
});
