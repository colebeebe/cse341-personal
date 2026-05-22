import { Router } from 'express';
import { getBooks, postBook } from './books.js';

const routes = Router();

routes.get('/books', getBooks);
routes.post('/books', postBook);

export default routes;
