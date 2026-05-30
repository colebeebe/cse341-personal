import { Router } from 'express';
import bookRouter from './books/routes.js';
import apiRouter from './swagger.js';

const routes = Router();

routes.get('/', (req, res) => {
  res.send('<p>View the <a href="/api-docs">docs</a>.</p>');
});

routes.use('/books', bookRouter);
routes.use('/api-docs', apiRouter);

export default routes;
