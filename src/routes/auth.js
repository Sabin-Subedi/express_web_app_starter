import { Router } from 'express';
import passport from 'passport';
import config from '../config/index.js';
import { signJWTToken } from '../utils/jwtUtils.js';

const router = new Router();

router.post(
  '/auth/login/',
  passport.authenticate('local'),
  async (req, res, next) => {
    try {
      const token = await signJWTToken({ user: req.user });

      res.cookie('token', token, config.jwtCookieOption);

      return res.status(201).send({ token });
    } catch (err) {
      next(err);
    }
  },
);

export default router;
