var express = require('express');
var app = express();
require('es6-promise').polyfill();
var pg = require('pg');
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

pg.defaults.ssl = true;



app.get('/', function (req, res) {
  res.send('Hello World');
})

app.get('/users', function(req, res) {
  response = [];
  pg.connect('postgres://wfkyiafdxkqhgx:HlMV9WCE-OWOs7WKXeHai6opi0@ec2-54-243-195-160.compute-1.amazonaws.com:5432/d3je1pifhdpsdp', function(err, client) {
    if (err) {
      console.log("Ran into error");
      throw err;
    } 
    var i = 0;
    client.query('SELECT * from Users;').on('row', function(row){
      response.push(row);
      console.log("Content of Users:")
      console.log(JSON.stringify(row));
    }).on("end", function() {
      res.end(JSON.stringify(response));
    });
  });
})


app.post('/users', urlencodedParser, function (req, res) {
  pg.connect('postgres://wfkyiafdxkqhgx:HlMV9WCE-OWOs7WKXeHai6opi0@ec2-54-243-195-160.compute-1.amazonaws.com:5432/d3je1pifhdpsdp', function(err, client) {
    if (err) {
      console.log("Ran into error");
      throw err;
    } 
    console.log(req.body);
    var i = 0;
    var query = "INSERT INTO USERS(id, username, password) VALUES(" + req.body.userid + ", '" + req.body.username + "', '" + req.body.password + "');";
    var r = "";
    console.log(query);
    client.query(query);
  });
})


var port_number = process.env.PORT || 8081;
var server = app.listen(port_number, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})