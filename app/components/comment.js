var React = require('react');

var Comment = React.createClass({
    handleDelete: function(articleId, commentId) {
        this.props.onCommentDelete(articleId, commentId);
    },

    render: function() {
        return (
            <li className="list-group-item">
                <div className="row">
                    <div className="col-sm-9">
                        <p className="list-group-item-text">
                            { this.props.comment.body }
                        </p>
                    </div>
                    <div className="col-sm-3">
                        <button onClick={ function(event) {
                                    this.handleDelete(this.props.article._id, this.props.comment._id)
                                }.bind(this) }
                                className="btn btn-secondary btn-sm pull-right">
                            Delete
                        </button>
                    </div>
                </div>
            </li>
        )
    }
});

module.exports = Comment;
