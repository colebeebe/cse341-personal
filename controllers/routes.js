import { Router } from 'express';
import { getMovies } from './movies.js';

const routes = Router();

routes.get('/movies', getMovies);

export default routes;
