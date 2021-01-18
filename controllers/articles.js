const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const { articleNotFound, removingForbidden } = require('../utils/constants');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.send(articles))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.send(article))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .orFail(() => {
      throw new NotFoundError(articleNotFound);
    })
    .then((article) => {
      if (article.owner.toString() === req.user._id) {
        Article.findOneAndRemove(req.params.articleId)
          .then((removedArticle) => {
            res.send(removedArticle);
          });
      } else {
        throw new ForbiddenError(removingForbidden);
      }
    })
    .catch(next);
};
