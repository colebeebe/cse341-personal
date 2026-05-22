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

export default routes;
