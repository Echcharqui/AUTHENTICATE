/// //////////////////// rate limiters ////////////////////////////////
const { rateLimiter4on1, rateLimiter1on1 } = require('./rate_limiter/rate_limiter')
/// ///////////////////////////////////////////////////////////////////

/// //////////////////// token virifiers //////////////////////////////////
const { isAuthenticatedAsSimpleUser } = require('./token_verifier/access_token_verifier')
const { isTheAcountValidationTokenValid } = require('./token_verifier/acount_validation_token_verifier')
/// ///////////////////////////////////////////////////////////////////////

module.exports = {
  rateLimiter4on1,
  rateLimiter1on1,
  isAuthenticatedAsSimpleUser,
  isTheAcountValidationTokenValid
}
