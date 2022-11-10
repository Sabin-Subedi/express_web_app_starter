import dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'development';
dotenv.config({
  path: `.env.${env.toLowerCase()}`,
});

const config = {
  environment: env,
  payloadLimit: '10mb', // payload limit for expressjs
  nodePort: process.env.PORT || 8000,
  passwordSecurityToken: process.env.PASSWORD_SECURITY_TOKEN,

  jwtSecret: process.env.JWT_SECRET_KEY,
  cookieSecret: process.env.COOKIE_SECRET_KEY,

  jwtCookieOption: {
    maxAge: 10800000, // 3h
    httpOnly: true,
    sameSite: true,
    signed: true,
    secure: true,
  },

  jwtHeaderOptions: {
    algorithm: 'HS384',
    audience: 'admin.myapp',
    expiresIn: '3h', // 3h
    issuer: 'admin.myapp',
  },

  jwtOptions: {
    algorithm: 'HS384',
    audience: 'admin.myapp',
    expiresIn: '3h', // 3h
    issuer: 'admin.myapp',
  },
};

export default config;
