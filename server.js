var express = require('express');
var app = express();

app.use(express.static(__dirname + '/metrolink'));

app.listen(8000);
console.log("Listening on port 8000")