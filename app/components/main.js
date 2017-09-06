var React = require('react');
var Search = require('./search');
var Top = require('./top');
var Saved = require('./saved');
var axios = require('axios');

var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json" +
                   "?api-key=679f5c0d741504c1d8ea4838c1b23efa3&q=";

var Main = React.createClass({
    getInitialState: function() {
        return {
            searchTerm: '',
            numberArticles: 5,
            startYear: '',
            endYear: '',
            topArticles: [],
            savedArticles: [],
            newComment: ''
        }
    },

    componentDidMount: function() {
        this.fetchSavedArticles()
    },

    fetchSavedArticles: function() {
        axios.get('/api/articles/').then(function(response) {
            this.setState({ savedArticles: response.data });
        }.bind(this));
    },

    handleUserInput: function(object) {
        this.setState(object);
    },

    handleCommentInput: function(object) {
        this.setState(object);
    },

    handleClear: function() {
        this.setState({ topArticles: [] });
    },

    handleFormSubmit: function() {
        var queryURL = queryURLBase + this.state.searchTerm;
        if (parseInt(this.state.startYear)) {
            queryURL = queryURL + "&begin_date=" + this.state.startYear + "0101";
        }

        if (parseInt(this.state.endYear)) {
            queryURL = queryURL + "&end_date=" + this.state.endYear + "0101";
        }

        axios.get(queryURL).then(function(NYTData) {
            this.addArticles(NYTData, this.state.numberArticles);
        }.bind(this));
    },

    handleArticleSave: function(article) {
        var savedArticles = this.state.savedArticles;
        var newArticle = {
            title: article.title,
            link: article.link,
            pub_date: article.date,
            section_name: article.sectionName,
            original_byline: article.originalByline
        }
        axios.post('/api/articles', newArticle)
            .then(function (response) {
                savedArticles.push(response.data);
                this.setState({
                    savedArticles: savedArticles
                })
            }.bind(this));
    },

    handleCommentSubmit: function(articleId) {
        axios.post('/api/articles/' + articleId + '/comments',
            { body: this.state.newComment })
            .then(function(response) {
                this.setState({
                    newComment: ''
                })
            }.bind(this));
    },

    handleArticleDelete: function(articleId) {
        axios.delete('/api/articles/' + articleId, {}).then(function(article) {
            console.log(article)
        });
    },

    componentDidUpdate: function() {
        this.fetchSavedArticles()
    },

    handleCommentDelete: function(articleId, commentId) {
        axios.delete('/api/articles/' + articleId + '/comments/' + commentId, {})
            .then(function(comment) {
                console.log(comment)
            });;
    },

    addArticles: function(NYTData, numberOfArticles) {
        var articles = [];
        for (var i = 0; i < numberOfArticles; i++) {
            var article = NYTData.data.response.docs[i];
            var localObject = {};
            localObject.id = i;
            localObject.title = article.headline.main;
            localObject.link = article.web_url;
            localObject.date = article.pub_date;
            localObject.sectionName = article.section_name;

            if(article.byline && article.byline.hasOwnProperty("original")) {
                localObject.originalByline = article.byline.original;
            }
            articles.push(localObject)
        }
        this.setState({
            topArticles: articles,
            searchTerm: '',
            numberArticles: 5,
            startYear: '',
            endYear: '',
        });
    },

    render: function() {
        return (
            <div>
                <Search searchTerm={ this.state.searchTerm }
                        numberArticles={ this.state.numberArticles }
                        startYear={ this.state.startYear }
                        endYear={ this.state.endYear }
                        onUserInput={ function(object) {
                            this.handleUserInput(object)
                        }.bind(this) }
                        onFormSubmit={ function() {
                            this.handleFormSubmit()
                        }.bind(this) }
                        onClear={ function() {
                            this.handleClear()
                        }.bind(this) } />
                <Top topArticles={ this.state.topArticles }
                     onArticleSave={ function(article) {
                         this.handleArticleSave(article)
                     }.bind(this) } />
                <Saved savedArticles={ this.state.savedArticles }
                       newComment={ this.state.newComment }
                       onArticleDelete={ function(articleId) {
                           this.handleArticleDelete(articleId)
                       }.bind(this) }
                       onCommentInput={ function(object) {
                           this.handleCommentInput(object)
                       }.bind(this) }
                       onCommentSubmit={ function(articleId) {
                           this.handleCommentSubmit(articleId)
                       }.bind(this) }
                       onCommentDelete={ function(articleId, commentId) {
                           this.handleCommentDelete(articleId, commentId)
                       }.bind(this) } />
            </div>
        )
    }
});

module.exports = Main;
