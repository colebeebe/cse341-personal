import { Router } from 'express';

import bookRouter from './books.js';
import authorRouter from './authors.js';
import swaggerRouter from './swagger.js';

const router = Router();

router.get('/', (req, res) => {
  res.send('<p>View the <a href="/api-docs">docs</a>.</p>');
});

router.use('/books', bookRouter);
router.use('/authors', authorRouter);
router.use('/api-docs', swaggerRouter);

export default router;
