require('dotenv').config();
module.exports = {
  server: {
    protocol: process.env.PROTOCOL || 'http',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || '3000',
    DB_URL: process.env.DB_URL || 'mongodb://localhost:27017',
    default_db_name: process.env.DEFAULT_DB_NAME || 'defaultDB',
  },
  sslCertificates: {
    privkey: process.env.PRIVKEY,
    fullchain: process.env.FULLCHAIN
  },
}