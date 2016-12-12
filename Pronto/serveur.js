var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var ejs = require('ejs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var com = {"idCommande":"commande1481120647839","PrixTotal":"9.50","idTable":"Table 1","typePaiement":"Liquide","commande":{"boissons":{"elem2":{"Nom":"Café","Categorie":"Softs","Detail":"","Prix":"1.5","Quantite":"1"}},"plats":{"elem1":{"Nom":"Gaspacho","Categorie":"Entrées","Detail":"","Prix":"5","Quantite":"1","Accompagnements":[],"Supplements":[]}}}};


var server;
makeServeur();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/views', express.static(path.resolve(__dirname, 'views')));
app.use('/public', express.static(path.resolve(__dirname, 'public')));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var index = require('./routes/index');
var bar = require('./routes/bar');
var cuisine = require('./routes/cuisine');
var caisse = require('./routes/caisse');

app.use('/', index);
app.use('/bar', bar);
app.use('/cuisine', cuisine);
app.use('/CaisseEnregistreuse', caisse);

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

var nspCaisseEnregistreuse = io.of('/CaisseEnregistreuse');
nspCaisseEnregistreuse.on('connection', function(socket){
    console.log('Caisse Enregistreuse connected');

    socket.on('disconnect', function(){
        console.log('Caisse Enregistreuse disconnected');
    });
});

var insertDocuments = function(db, callback,data) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Insert some documents
    collection.insert(
        data, function(err, result) {
            console.log("success");
            callback(result);
        });
};

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
};


var deleteDocument = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Insert some documents
    collection.deleteOne({ a : 3 }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Removed the document with the field a equal to 3");
        callback(result);
    });
};



var mySqlClient = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "mpolkiuj",
    database : "pronto"
});

var loginResult = new Object();
var queryLogin = 'SELECT IdServeur, Pass FROM serveurs';

DBQueryLogin(queryLogin,loginResult,'IdServeur','Pass');

function DBQueryLogin(query,receive,key,value){
    mySqlClient.query(query,
        function select(error, results, fields) {
            if ( results.length > 0 )  {
                for(i in results){
                    receive[results[ i ][key]] = results[ i ][value];
                }

            } else console.log("Pas de données");
        });
}

app.post('/process_post', function (req, res) {
    var commande = req.body;
    if(commande != ""){
        res.sendStatus(200);
        reception(commande);
        console.log('----');
    } else res.sendStatus(500);

});

app.post('/login_post', function (req, res) {
    console.log(loginResult);
    var user_name=req.body.user;
    var password=req.body.password;
    console.log("User name = "+user_name+", password is "+password);
    var rs = ckL(user_name,password);
    console.log(rs);
    if(!rs)res.sendStatus(500);
    else res.sendStatus(200);
});

function ckL(usr,pwd){
    var tab = Object.keys(loginResult);
    //console.log(tab);
    if(tab.indexOf(usr) != -1){
        console.log("login ok");
        if(loginResult[usr] == pwd) {
            console.log("Pass ok");
            return true;


        } else{
            console.log("Pass nok");
            return false;
        }
    } else {
        console.log("login nok");
        return false;
    }


}


app.post('/caisse_post', function (req, res) {
    var commande = req.body;
    commande = com;
    if(commande != "") {
        res.sendStatus(200);
        //commande = JSON.stringify(commande);
        //console.log(commande);
        recordVente(JSON.stringify(commande));
    } else res.sendStatus(500);


});

function recordVente(commande) {
    console.log(commande);


}

function sendBar(data){
    nspBar.emit('bar', data);
}

function sendCuisine(data){
    nspCuisine.emit('cuisine', data);
}

function sendCaisseEnregistreuse(data){
    nspCaisseEnregistreuse.emit('CaisseEnregistreuse', data);
}

function reception(commande) {
    console.log(JSON.stringify(commande));
    //recordDB(commande);
    //viewDB();
    sendBar(commande);
    sendCuisine(commande);
    sendCaisseEnregistreuse(commande);

}

function recordDB(data) {
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


function makeServeur () {
    server = http.listen(3000, function () {
        var host = server.address().address
        var port = server.address().port

        console.log("The server listening at http://%s:%s", host, port)

    })
}




module.exports = app;

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

/*

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


 var deleteDocument = function(db, callback) {
 // Get the documents collection
 var collection = db.collection('documents');
 // Insert some documents
 collection.deleteOne({ a : 3 }, function(err, result) {
 assert.equal(err, null);
 assert.equal(1, result.result.n);
 console.log("Removed the document with the field a equal to 3");
 callback(result);
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

 */