import type { Request, Response } from 'express';

const routes = require('express').Router();

routes.get('/', (req: Request, res: Response) => {
  res.send('<p>View the <a href="/api-docs">docs</a>.</p>');
});

routes.use('/books', require('./books'));
routes.use('/api-docs', require('./swagger'));

module.exports = routes;
