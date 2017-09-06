var React = require('react');
var SavedArticle = require('./saved-article');

var Saved = React.createClass({
    handleNewArticleDelete: function(articleId) {
        this.props.onArticleDelete(articleId);
    },

    handleNewCommentInput: function(object) {
        this.props.onCommentInput(object);
    },

    handleNewCommentSubmit: function(articleId) {
        this.props.onCommentSubmit(articleId);
    },

    handleNewCommentDelete: function(articleId, commentId) {
        this.props.onCommentDelete(articleId, commentId);
    },

    render: function() {
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        <strong>
                            <i className="fa fa-file-text-o"></i> Saved Articles
                        </strong>
                    </h3>
                </div>
                <div className="panel-body" id="savedSection">
                    { this.props.savedArticles.map(function(article) {
                        return <SavedArticle article={ article }
                                             key={ article._id }
                                             newComment={ this.props.newComment }
                                             onNewArticleDelete={ function(articleId) {
                                                 this.handleNewArticleDelete(articleId)
                                             }.bind(this) }
                                             onNewCommentInput={ function(object) {
                                                 this.handleNewCommentInput(object)
                                             }.bind(this) }
                                             onNewCommentSubmit={ function(articleId) {
                                                 this.handleNewCommentSubmit(articleId)
                                             }.bind(this) }
                                             onNewCommentDelete={ function(articleId, commentId) {
                                                 this.handleNewCommentDelete(articleId, commentId)
                                             }.bind(this) } />
                    }.bind(this)) }
                </div>
            </div>
        )
    }
});

module.exports = Saved;
