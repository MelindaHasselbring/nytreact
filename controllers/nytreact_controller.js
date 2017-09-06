var Article = require('../models/article');
var Comment = require('../models/comment');

module.exports = function(app) {
    app.get('/api/articles', function(_request, response) {
        Article.find({}, function(error, articles) {
            if (error) {
                response.send(error);
            } else {
                response.json(articles);
            }
        });
    });

    app.get('/api/articles/:id/comments', function(request, response) {
        var articleId = request.params.id;
        Article.findOne({ _id: articleId })
            .populate('comments')
            .exec(function(error, article) {
                if (article) {
                    if (error) {
                        response.send(error);
                    } else {
                        response.json(article.comments);
                    }
                }
            });
    });

    app.post('/api/articles', function(request, response) {
        var article = request.body;
        Article.create(article, function(error, article) {
            if (error) {
                response.send(error);
            } else {
                response.send(article);
            }
        });
    })

    app.post('/api/articles/:id/comments', function(request, response) {
        var articleId = request.params.id;
        var comment = request.body.body;
        Article.findOne({
            _id: articleId
        }, function(_error, article) {
            Comment.create({
                _article: article._id,
                body: comment
            }, function(error, comment) {
                article.comments.push(comment);
                article.save(function(error) {
                    if (error) {
                        response.send(error);
                    } else {
                        response.send(comment);
                    }
                });
            });
        });
    });

    app.delete('/api/articles/:id', function(request, response) {
        var articleId = request.params.id;
        Article.remove({ _id: articleId }, function(error, article) {
            if (error) {
                response.send(error);
            } else {
                response.send(article)
            }
        });
    });

    app.delete('/api/articles/:article_id/comments/:id', function(request, response) {
        var articleId = request.params.article_id;
        var commentId = request.params.id;
        Comment.remove({ _id: commentId }, function(error, comment) {
            if (error) {
                response.send(error);
            } else {
                response.send(comment)
            }
        });
    });

    app.get('/', function(_request, response) {
        response.send('index.html');
    });
}
