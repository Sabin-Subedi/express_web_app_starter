export default {
  cors_whitelist: ['http://localhost:3000', 'http://localhost:3001'],

  rateLimitConfig: {
    windowMs: 1 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  },
};
