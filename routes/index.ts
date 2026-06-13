import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('<p>View the <a href="/graphql">documentation</a>.</p>');
});

export default router;
