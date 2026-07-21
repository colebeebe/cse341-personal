// Package imports
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import { MongoStore } from 'connect-mongo';

// Helper imports
import { connectDB } from './models/db.js';
import { toHeaderMap, passportConfig } from './utils/helpers.js';
import { ensureAuth } from './middleware/auth.js';

// Main router
import router from './routes/index.js';

// GraphQL Imports
import typeDefs from './graphql/schema.js';
import resolvers from './graphql/resolver.js';

// Environment variables
const PORT = Number(process.env.PORT) || 3000;
const NODE_ENV = String(process.env.NODE_ENV) || 'production';
const SECRET = String(process.env.SECRET) || ''; // If no secret is defined, this will intentionally fail

// Configure passport
passportConfig(passport);

const app = express();

// Sessions
const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  collectionName: 'sessions',
});

app.set('trust proxy', 1);
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: !NODE_ENV.includes('dev'),
      sameSite: NODE_ENV.includes('dev') ? 'lax' : 'none',
      httpOnly: true,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// Set global variables
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});
await server.start();

app.use(express.json());
app.use(cors());

app.use('/', router);

// Use Apollo Server for GraphQL requests
app.use('/graphql', async (req, res) => {
  const headers = toHeaderMap(req.headers);
  const response = await server.executeHTTPGraphQLRequest({
    context: async () => ({
      session: req.session,
      user: req.user,
    }),
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

try {
  connectDB();

  app.listen(PORT, () => {
    if (NODE_ENV.includes('dev')) {
      console.log(`Listening at http://localhost:${PORT}`);
    } else {
      console.log(`Listening on port ${PORT}`);
    }
  });
} catch (err: any) {
  console.log(err);
}
