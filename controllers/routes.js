import { Router } from 'express';
import { getMovies, postMovie } from './movies.js';

const routes = Router();

routes.get('/movies', getMovies);
routes.post('/movies', postMovie);

export default routes;
