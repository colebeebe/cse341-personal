import { Router } from 'express';
import passport from 'passport';

const router = Router();

/**
 * @description Athenticate with google
 * @route GET /auth/google
 */
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

/**
 * @description Google auth callback
 * @route GET /auth/google/callback
 */
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/graphql');
  },
);

export default router;
