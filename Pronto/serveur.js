var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);


var nspCuisine = io.of('/cuisine');
nspCuisine.on('connection', function(socket){
    console.log('cuisine connected');

    socket.on('disconnect', function(){
        console.log('cuisine disconnected');
    });
});

var nspBar = io.of('/bar');
nspBar.on('connection', function(socket){
    console.log('bar connected');

    socket.on('disconnect', function(){
        console.log('bar disconnected');
    });
});




var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/db';

var insertDocuments = function(db, callback,data) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Insert some documents
    collection.insert(
        data, function(err, result) {
            console.log("success");
            callback(result);
        });
}

var findDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
}

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", express.static(__dirname + "/public"));
app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
    console.log("Homepage visiting");
})

app.get('/bar', function (req, res) {
    res.sendFile( __dirname + "/" + "bar.html" );
    console.log("Bar visiting");
})


app.get('/cuisine', function (req, res) {
    res.sendFile( __dirname + "/" + "cuisine.html" );
    console.log("Cuisine visiting");
})





app.post('/process_post', function (req, res) {
    reception(req,res);
    console.log('----');
})

function recordDB (data) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server database");

        insertDocuments(db, function () {
            db.close();
        }, data);

    });

}

function viewDB(){
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server database");
        console.log("contenu de la db");
        findDocuments(db, function () {
            db.close();
        });
    });

}

function sendBar(data){
    nspBar.emit('bar', data);
}

function sendCuisine(data){
    nspCuisine.emit('cuisine', data);
}

function reception(req,res) {
    var commande = req.body;
    recordDB(commande);
    viewDB();
    console.log(commande);

    cuisine =  new Array(commande['idCommande'],commande['idTable'],JSON.stringify(commande['commande']['plats']));
    bar = new Array(commande['idCommande'],commande['idTable'],JSON.stringify(commande['commande']['boissons']));
    sendBar(bar);
    sendCuisine(cuisine);


}
    var server = http.listen(3000, function () {
        var host = server.address().address
        var port = server.address().port

        console.log("The server listening at http://%s:%s", host, port)

    })