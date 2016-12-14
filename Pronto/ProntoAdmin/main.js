var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');
var bodyParser = require("body-parser");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'pronto'
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3100, function () {
  console.log('Listening on port 3100!');
});

connection.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established to DB');
});

/*connection.end(function(err) {
    console.log('Connection du DB closed');
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});*/

app.post('/get_users', function (req, res){
    var result;
    connection.query("SELECT IdServeur FROM pronto.serveurs", function(err, rows){
        if(err) throw err;
        console.log(rows);
        result = JSON.stringify(rows);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(result);
        console.log(result);
    });
});

app.post('/add_user', function(req, res){
   var username = req.body.username;
   var password = req.body.pwd;
   connection.query("INSERT INTO pronto.serveurs (IdServeur, NomServeur, Pass) VALUES('" + username + "','Gnanana','" + password + "')");
   res.end('done');
});

app.post('/remove_user', function(req, res){
    var username = req.body.username;
    connection.query("DELETE FROM pronto.serveurs WHERE IdServeur = '" + username + "'");
    res.end('done');
});

app.post('/add_plat', function(req, res){
   var plat = req.body.plat;
   var prix = req.body.prix;
   var cat = req.body.cat;
   console.log(cat + " / " + plat + " / " + prix);
   connection.query("INSERT INTO pronto.plats VALUES(default,'" + plat + "','" + prix + "','" + cat + "')");
   res.end('done');
});

app.post('/add_accomp', function(req, res){
   var accomp = req.body.accomp;
   console.log(accomp);
   connection.query("INSERT INTO pronto.accompagnements VALUES(default,'" + accomp + "')");
   res.end('done');
});

app.post('/add_supp', function(req, res){
   var supp = req.body.supp;
   console.log(supp);
   connection.query("INSERT INTO pronto.supplements VALUES(default,'" + supp + "', '3')");
   res.end('done');
});

app.post('/add_boisson', function(req, res){
   var boisson = req.body.boisson;
   var prix = req.body.prix;
   var cat = req.body.cat;
   console.log(cat + " / " + boisson + " / " + prix);
   connection.query("INSERT INTO pronto.boissons VALUES(default,'" + boisson + "','" + prix + "','" + cat + "')");
   res.end('done');
});