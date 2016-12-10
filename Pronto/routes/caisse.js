var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var mySqlClient = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "alex",
    database : "pronto"
});

var tableResult = [];
var platsSupendus = [];
var tva = [];


var queryTable = 'SELECT IdTable FROM tables ORDER BY IdTable ASC';
var queryplatsSupendus = 'SELECT Label, Quantite, Prix FROM pronto.ensuspens ORDER BY Label';
var  querytva = 'SELECT TypeTVA, TauxTVA FROM pronto.tva ORDER BY TypeTVA';



DBQuery(queryTable,tableResult,"IdTable");
DBQueryPlsusp(queryplatsSupendus,platsSupendus,"Label", "Quantite", "Prix");
DBQuery(querytva,tva,"TauxTVA");



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

function DBQueryPlsusp(query,receive,id,qtt,prix){
    mySqlClient.query(query,
        function select(error, results, fields) {
            if ( results.length > 0 )  {
                for(i in results){
                    receive[ i ] = [results[ i ][id],results[ i ][qtt],results[ i ][prix]];
                }

            } else console.log("Pas de données");
        });
}


router.get('/', function (req, res,next) {
    console.log(tableResult);
    console.log(platsSupendus);
    console.log(tva);
    res.render('caisse',{
        RestaurantName:"Resto",
        Table:tableResult,
        PlatsSuspendus: platsSupendus,
        Tva:tva
    });
});

module.exports = router;