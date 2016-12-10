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
var queryplatsSupendus = 'SELECT TauxTVA FROM pronto.tva';
var querytva = "SELECT Label, Quantite, Prix FROM pronto.ensuspens WHERE Label ='cafe'";


DBQuery(queryTable,tableResult,"IdTable");
//DBQuery(queryplatsSupendus,platsSupendus,"Label", "Quantite", "Prix");
//DBQuery(queryplatsSupendus,tva,"TauxTVA");



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


router.get('/', function (req, res,next) {
    console.log(tableResult);
    console.log(tva);
    var tva = ["0.06","0.21"];
    res.render('caisse',{
        RestaurantName:"Resto",
        Table:tableResult,
        //PlatsSuspentus: platsSupendus,
        Tva:tva
    });
});

module.exports = router;