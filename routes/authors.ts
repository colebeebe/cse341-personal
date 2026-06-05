import { Router } from 'express';

import { getAllAuthors, createAuthor } from '../controllers/authors.js';

const router = Router();

router.get('/', getAllAuthors);

router.post('/', createAuthor);

export default router;
