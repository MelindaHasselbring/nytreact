var React = require('react');

var Search = React.createClass({
    handleChange: function(event) {
        var name = event.target.name;
        var obj = {};
        obj[name] = event.target.value;
        this.props.onUserInput(obj);
    },

    handleSubmit: function(event) {
        event.preventDefault();
        this.props.onFormSubmit();
    },

    handleClear: function(event) {
        this.props.onClear();
    },

    render: function() {
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        <strong>
                            <i className="fa fa-list-alt"></i> Search Parameters
                        </strong>
                    </h3>
                </div>
                <div className="panel-body">
                    <form role="form" className="form"
                          onSubmit={ function(event) {
                              this.handleSubmit(event)
                          }.bind(this) }>
                        <div className="form-group">
                            <label htmlFor="searchTerm">Search Term:</label>
                            <input type="text" className="form-control"
                                   id="searchTerm" name="searchTerm"
                                   value={ this.props.searchTerm }
                                   onChange={ function(event) {
                                       this.handleChange(event)
                                   }.bind(this) } />
                        </div>
                        <div className="form-group">
                            <label htmlFor="numRecordsSelect">Number of Records to Retrieve:</label>
                            <select className="form-control" id="numRecordsSelect"
                                    name='numberArticles'
                                    onChange={ function(event) {
                                        this.handleChange(event)
                                    }.bind(this) }
                                    value={ this.props.numberArticles }>
                                <option value="1">1</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="startYear">Start Year (Optional):</label>
                            <input type="text" className="form-control" id="startYear"
                                    name='startYear'
                                    onChange={ function(event) {
                                        this.handleChange(event)
                                    }.bind(this) }
                                    value={ this.props.startYear } />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endYear">End Year (Optional):</label>
                            <input type="text" className="form-control" id="endYear"
                                    name='endYear'
                                    onChange={ function(event) {
                                        this.handleChange(event)
                                    }.bind(this) }
                                    value={ this.props.endYear } />
                        </div>
                        <button type="submit" className="btn btn-default"
                                id="runSearch">
                            <i className="fa fa-search"></i> Search
                        </button>
                        <button type="button" className="btn btn-default"
                                id="clearAll"
                                onClick={ function(event) {
                                    this.handleClear(event)
                                }.bind(this) }>
                            <i className="fa fa-trash"></i> Clear Results
                        </button>
                    </form>
                </div>
            </div>
        )
    }
})

module.exports = Search;
