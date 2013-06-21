var express = require('express');

// app is a callback function that designed to be passed to node's http servers and handle requests.
var app = express();

// serve public folder statically.
app.use(express.static(__dirname + '/public'));

// server is an node.js http server as returned by http.createServer(function (req, res) {});
var server = app.listen(3000);
