import { Router } from 'express';
import { getBooks, postBook } from './books.js';
import apiRouter from './swagger.js';

const routes = Router();

routes.get('/', (req, res) => {
  res.send('<p>View the <a href="/api-docs">docs</a>.</p>');
});

routes.use('/api-docs', apiRouter);

routes.get('/books', getBooks);
routes.post('/books', postBook);

// "Design-first" methods
routes.get('/books/:id', (req, res) => {
  res.send('GET by id');
});

routes.put('/books/:id', (req, res) => {
  res.send('PUT (by id)');
});

routes.delete('/books/:id', (req, res) => {
  res.send('DELETE (by id)');
});

export default routes;
