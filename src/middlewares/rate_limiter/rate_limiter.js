const rateLimit = require('express-rate-limit')

const rateLimiter4on1 = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 4, // Limit each IP to 4 requests per `window` (here, per 1 minute)
  // message: 'You have sent too many requests in a given amount of time, please try again later',
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({ error: 'You have sent too many requests in a given amount of time, please try again later' })
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false // Disable the `X-RateLimit-*` headers
})

module.exports = { rateLimiter4on1 }
