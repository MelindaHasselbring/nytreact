var React = require('react');
var Comment = require('./comment')

var Comments = React.createClass({
    handleCommentDelete: function(articleId, commentId) {
        this.props.onOldCommentDelete(articleId, commentId);
    },

    render: function() {
        return (
            <div>
                <h5>Comments</h5>
                <ul style={ { padding: 0 } }>
                    { this.props.comments.map(function(comment) {
                        return <Comment article={ this.props.article }
                                        comment={ comment } key={ comment._id }
                                        onCommentDelete={ function(articleId, commentId) {
                                            this.handleCommentDelete(articleId, commentId);
                                        }.bind(this)} />
                    }.bind(this)) }
                </ul>
            </div>
        )
    }
});

module.exports = Comments;
