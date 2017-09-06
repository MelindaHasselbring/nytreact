var React = require('react');

var TopArticle = React.createClass({
    handleSave: function(event, article) {
        event.preventDefault();
        this.props.onNewArticleSave(article);
    },

    render: function() {
        return(
            <div className='well' id={ 'articleWell-' + this.props.article.id }>
                <div className='row'>
                    <div className='col-xs-9'>
                        <h3 className='articleHeadline'>
                            <span className='label label-primary'>{ this.props.article.id + 1 }</span>
                            <strong> { this.props.article.title }</strong>
                        </h3>
                        <h5>{ this.props.article.originalByline }</h5>
                        <h5>Section: { this.props.article.sectionName }</h5>
                        <h5>{ this.props.article.date }</h5>
                        <a href={ this.props.article.link }></a>
                    </div>
                    <div className='col-xs-3'>
                        <br />
                        <button type='submit' form={ 'hidden-form-' + this.props.article.id }
                                className='btn btn-primary pull-right'>Save</button>
                        <form id={ 'hidden-form-' + this.props.article.id }
                              className='hidden-xs-up'
                              onSubmit={ function(event) {
                                  this.handleSave(event, this.props.article)
                              }.bind(this) }>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = TopArticle;
