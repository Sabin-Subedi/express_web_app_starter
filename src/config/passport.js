import passport from 'passport';
import JwtCookieComboStrategy from 'passport-jwt-cookiecombo';
import LocalStrategy from 'passport-local';
import { findByEmail, verifyPassword } from '../models/User.js';
import config from './index.js';

console.log(process.env.JWT_SECRET_KEY);

passport.use(
  new JwtCookieComboStrategy(
    {
      secretOrPublicKey: config.jwtSecret,
      jwtVerifyOptions: config.jwtOptions,
    },
    (payload, done) => {
      // do something with payload
      done(null, payload);
    },
  ),
);

passport.use(
  new LocalStrategy.Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (username, password, done) => {
      // do something with username and password
      try {
        const user = await findByEmail(username);
        // Copy the user w/o the password into a new object
        if (user && verifyPassword(user, password)) {
          return done(null, { id: user.id, role: user.role });
        }
        return done(null, false);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
