/**
 * Created by Grant on 2/8/2016.
 */

var express = require('express');
var bodyParser = require('body-parser')
var app = express();

app.post('/', function (req, res) {
    res = bodyParser.text(res)
    res.send('Hi there');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});