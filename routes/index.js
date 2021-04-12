const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const users = require('./users');
const articles = require('./articles');
const { signup, login } = require('../controllers/users');
const { pageNotFound } = require('../utils/constants');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(8),
  }),
}), signup);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

router.use(auth);
router.use('/users', users);
router.use('/articles', articles);
router.use((req, res) => {
  res.status(404).send({ message: pageNotFound });
});

module.exports = router;
