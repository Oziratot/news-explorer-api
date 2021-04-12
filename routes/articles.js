const articles = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');

articles.get('/', getArticles);

articles.post('/', celebrate({
  body: Joi.object().keys({
    link: Joi.string().required().regex(/https?:\/\/(w{3}\.)?[\w-]*\.[\w/.!#$%&_?]*/),
    image: Joi.string().required().regex(/https?:\/\/(w{3}\.)?[\w-]*\.[\w/.!#$%&_?]*/),
  }).unknown(true),
}), createArticle);

articles.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().hex().length(24),
  }),
}), deleteArticle);

module.exports = articles;
