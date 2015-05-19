var express = require('express'),
app = express();
 
app.listen(3303);
console.log('Listening on port 3303')

var setContentType = function(type) {
    return function(req, res, next) {
        res.setHeader('Content-Type', 'text/' + type);
        next();
    }
}

var absurd = require("absurd");
var homePage = function(req, res, next) {
    absurd().morph("html").import(__dirname + "/pages/landing.js").compile(function(err, html) {
        res.send(html);
    });
}
app.get('/', setContentType("html"), homePage);

var styles = function(req, res, next) {
    absurd().import(__dirname + "/pages/styles.js").compile(function(err, css) {
        res.send(css);
    });
}
app.get('/styles.css', setContentType("css"), styles);