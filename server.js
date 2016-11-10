var express = require('express');
var app = express();
var db = require('./dbconfig.js');


app.get('/', function (req, res) {
  res.send('Hello World');
})

app.get('/name', function(req, res) {
  response = {
    fname: req.query.first_name,
    lname: req.query.last_name
  };
  // console.log(response);
  res.end(JSON.stringify(response));
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})