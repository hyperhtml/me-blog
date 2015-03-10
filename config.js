var localConfig = require('./localconfig');

var config = {};

// Google OAuth Credentials
config.GOOGLE_CLIENT_ID = "" || localConfig.GOOGLE_CLIENT_ID;
config.GOOGLE_CLIENT_SECRET = "" || localConfig.GOOGLE_CLIENT_SECRET;

// Database Settings
config.DB_HOST = "localhost";
config.DB_PORT = 27017;

// Expose Config
module.exports = config;
