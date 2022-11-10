/* eslint-disable no-console */
import dotenv from 'dotenv';
import express from 'express';
import compression from 'compression';
import { createHttpTerminator } from 'http-terminator';
import helmet from 'helmet';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import passport from 'passport';

const env = process.env.NODE_ENV || 'development';

// local files import
import config from './src/config/index.js';
import './src/config/passport.js';
import authRouter from './src/routes/auth.js';

// Load environment variables from .env file
dotenv.config({
  path: `./.env.${env.toLowerCase()}`,
});

// Create Express server
const app = express();
app.use(
  express.json({
    limit: config.payloadLimit,
  }),
);
app.use(passport.initialize());

// x-powered-by header banner
app.disable('x-powered-by');

// cookie parsing middleware that returns parsed cookie in req.cookies
app.use(cookieParser(config.cookieSecret));

// middleware
app.use(compression());

// Helmet helps you secure your Express apps by setting various HTTP headers
app.use(helmet());

// routing middleware in express

// defining the port to run the server
const PORT = process.env.PORT || 8000;
const ENV = process.env.NODE_ENV;

// running express application on the port defined in env or 8000
const server = app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT} in ${ENV} mode`);
  console.log('Press CTRL-C to stop');
});

app.use('/api/', authRouter);

// 404 handler
app.use((req, res, next) => {
  next(new createError.NotFound());
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
    status_code: status,
    data: {},
  });
});

// Graceful shutdown
// implements logic for gracefully terminating an express.js server.
const httpTerminator = createHttpTerminator({ server });

process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await httpTerminator.terminate();
});
