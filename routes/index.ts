import { Router } from 'express';

import authRouter from './auth.js';

const router = Router();

router.get('/', (req, res) => {
  res.send('<p>View the <a href="/graphql">documentation</a>.</p>');
});

router.get('/login', (req, res) => {
  res.redirect('/auth/google');
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  res.redirect('/');
});

router.use('/auth', authRouter);

export default router;
