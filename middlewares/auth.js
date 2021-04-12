const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const { unauthorized } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: unauthorized });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return res.status(401).send({ message: unauthorized });
  }

  req.user = payload;
  return next();
};
