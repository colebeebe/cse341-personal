import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import routes from './controllers/routes.js';
import { connectDB } from './models/db.js';
import cors from './middleware/cors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(cors);

app.use('/', routes);

app.use((req, res, next) => {
  const err = new Error(
    '<h1>404: Page not found</h1><p>Return <a href="/">home</a>.</p>',
  );
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (res.headersSent || res.finished) {
    next(err);
  }

  const status = err.status || 500;

  res.status(status).send(err.message);
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Listening at http://localhost:${PORT}`);
});
