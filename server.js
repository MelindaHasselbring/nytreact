
var bodyParser = require('body-parser');
var express = require('express');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
mongoose.Promise = Promise;

var app = express();
var port = process.env.PORT || 3000;

// Serve static content for the app from the 'public' directory in the
// application directory.
app.use(express.static(__dirname + '/public'));

// // Override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

app.use(bodyParser.json());
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// Connection URL
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'dev') {
	mongoose.connect("mongodb://localhost:27017");
} else {
  	mongoose.connect("mongodb://heroku_8lq4ghl6:iqmt2t89an5gurk5o3ddr7lhts@ds123534.mlab.com:23534/heroku_8lq4ghl6");	
}


var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected');
    app.listen(port, function() {
        console.log('listening on ' + port);
    });
});

// get them routes
require('./controllers/nytreact_controller.js')(app);
