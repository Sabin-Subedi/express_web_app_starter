import jwt from 'jsonwebtoken';
import config from '../config/index.js';

function signJWTToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, config.jwtSecret, config.jwtOptions, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
}

function decodeJWTToken() {
  return new Promise((resolve, reject) => {
    jwt.verify(config.jwtSecret, config.jwtOptions, (err, decodedPayload) => {
      if (err) {
        reject(err);
      }
      resolve(decodedPayload);
    });
  });
}

export { signJWTToken, decodeJWTToken };
