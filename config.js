require('dotenv').config();

const {
  PORT = 3000, NODE_ENV, MONGODB_ADRESS, JWT_SECRET,
} = process.env;

const DB_URL = (NODE_ENV === 'production' ? MONGODB_ADRESS : 'mongodb://localhost:27017/news-explorer');
const SECRET_KEY = (NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');

module.exports = {
  PORT,
  DB_URL,
  SECRET_KEY,
};
