// Provides cryptographic functionality (OpenSSL's hash, HMAC, cipher, decipher, sign and verify functions)
const crypto = require('crypto').randomBytes(256).toString('hex');

// Export config object
module.exports = {
   localUri: 'mongodb://localhost:27017/jwt-passport-auth-db', // Databse URI and database name
   secret: crypto, // Cryto-created secret
   db: 'jwt-passport-auth-db' // Database name
}