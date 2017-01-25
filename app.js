/*eslint-env node*/

//------------------------------------------------------------------------------
// Web Server for Caue Polimanti's website
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// package to parse the body of a request into a JSON object
var bodyParser = require('body-parser');
// cookie parser to store user information
var cookieParser = require ('cookie-parser');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

/*
    setting up the middleware
*/

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// setting the views directory
app.set('views', './src/views');
// setting ejs as the view engine
app.set('view engine', 'ejs');

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

/*
    setting up the Routes
*/
// nav bar items
var nav = [
    {
        Link: '/resume',
        Text: 'Resume'
    }
];
app.get('/', function (req, res) {
    // rendering the index page, sending a json with the title and navigation items
    res.render('index', {
        title: 'Hello from render',
        nav: nav
    });
});

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("Running server on port " + appEnv.url);
});
