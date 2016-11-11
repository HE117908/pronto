var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var ejs = require('ejs');
var request = require("request");

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(__dirname + "/public"));

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
/*
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/db';
*/
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

var mySqlClient = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "mpolkiuj",
    database : "pronto"
});

var serveurResult = [];
var tableResult = [];
var loginResult = [];

var queryServeur = 'select IdServeur from Serveurs';
var queryTable = 'select IdTable from Tables';

DBQuery(queryServeur,serveurResult,"IdServeur");
DBQuery(queryTable,tableResult,"IdTable");

function DBQuery(query,receive,column){
    mySqlClient.query(query,
        function select(error, results, fields) {
            if ( results.length > 0 )  {
                for(i in results){
                    receive[i] = results[ i ][column];
                }

            } else console.log("Pas de données");
        });
}


app.get('/', function(req, res) {
    console.log(serveurResult);
    console.log(tableResult);
    var menu = ["Entrées","Plats","Desserts","Boissons"];
    res.render('index',{
        RestaurantName:"Resto",
        Menu:menu,
        Serveur:serveurResult,
        Table:tableResult

    });
});




app.get('/bar', function (req, res) {
    res.sendFile( __dirname + "/" + "bar.html" );
})


app.get('/cuisine', function (req, res) {
    res.sendFile( __dirname + "/" + "cuisine.html" );
})

app.get('/login', function (req, res) {
    res.sendFile( __dirname + "/" + "login.html" );
})

app.post('/process_post', function (req, res) {
    reception(req);
    console.log('----');
})

app.post('/login_post', function (req, res) {
    checkLog(req);
})

function checkLog(req) {
    var info = req.body;
    var pwd = info.pwd;
    var usr = info.usr;
    console.log(usr+" - "+pwd);

    var selectQuery = 'SELECT IdServeur, Pass FROM serveurs';

    mySqlClient.query(selectQuery,
        function select(error, results, fields) {
            if ( results.length > 0 )  {
                for(i in results){
                     loginResult[i] = results[ i ];
                    if(usr==loginResult[i]['IdServeur']&&pwd==loginResult[i]['Pass']){
                        console.log('bon mdp!');
                        console.log(loginResult[i]['IdServeur'] + ' + ' + loginResult[i]['Pass']);
                        //ici la fonction pour passer a index.html
                    }
                }
            } else console.log("Pas de données");
        });


}



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

function reception(req) {
    var commande = req.body;
    //recordDB(commande);
    //viewDB();
    console.log(commande);
    sendBar(commande);
    sendCuisine(commande);


}

    var server = http.listen(3000, function () {
        var host = server.address().address
        var port = server.address().port

        console.log("The server listening at http://%s:%s", host, port)

    })

/*
 var selectQuery = 'SELECT * FROM boissons';

 mySqlClient.query(
 selectQuery,
 function select(error, results, fields) {
 if (error) {
 console.log(error);
 mySqlClient.end();
 return;
 }

 if ( results.length > 0 )  {
 for(i in results){
 var firstResult = results[ i ];
 console.log('Nom: ' + firstResult['Nom']);
 console.log('Prix: ' + firstResult['Prix']);
 console.log('Catégorie: ' + firstResult['NomCatBoisson']);
 }
 var firstResult = results[ 0 ];
 console.log('Nom: ' + firstResult['Nom']);
 console.log('Prix: ' + firstResult['Prix']);
 console.log('Catégorie: ' + firstResult['NomCatBoisson']);
 } else {
 console.log("Pas de données");
 }
 mySqlClient.end();
 }
 );
 */