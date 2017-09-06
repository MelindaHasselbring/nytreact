var React = require('react');
var TopArticle = require('./top-article');

var Top = React.createClass({
    render: function() {
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        <strong><i className="fa fa-table"></i> Top Articles</strong>
                    </h3>
                </div>
                <div className="panel-body" id="topSection">
                    { this.props.topArticles.map(function(article) {
                        return <TopArticle article={ article }
                                           key={ article.id }
                                           onNewArticleSave={ function(article) {
                                               this.props.onArticleSave(article);
                                           }.bind(this) } />
                    }.bind(this)) }
                </div>
            </div>
        )
    }
});

module.exports = Top;
