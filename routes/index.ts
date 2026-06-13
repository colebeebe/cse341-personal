import { Router } from 'express';

import authRouter from './auth.js';

const router = Router();

router.get('/', (req, res) => {
  const message = `
    ${
      req.isAuthenticated()
        ? '<p>If you would like to logout, click <a href="/logout">here</a> or visit /logout at any time .</p>'
        : '<p>It appears you are not logged in. <a href="/login">Log in</a>.</p>'
    }
    <p>View the <a href="/graphql">documentation</a>.</p>
  `;
  res.send(message);
});

router.get('/login', (req, res) => {
  res.redirect('/auth/google');
});

router.get('/logout', (req, res, next) => {
  req.logout({ keepSessionInfo: true }, (err) => {
    if (err) {
      return next(err);
    }
  });
  res.redirect('/');
});

router.use('/auth', authRouter);

export default router;
