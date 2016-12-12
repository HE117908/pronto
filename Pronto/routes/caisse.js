var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/*
 * Etablissement de la connexion à la DB SQL
 */
var mySqlClient = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "mpolkiuj",
    database : "pronto"
});

/*
 * Tableau servant à stocker les données venant de la DB SQL
 */
var tableResult = [];
var platsSupendus = [];
var tva = [];

/*
 * queries select
 */
var queryTable = 'SELECT IdTable FROM tables ORDER BY IdTable ASC';
var queryplatsSupendus = 'SELECT Label, Quantite, Prix FROM pronto.ensuspens ORDER BY Label';
var  querytva = 'SELECT TypeTVA, TauxTVA FROM pronto.tva ORDER BY TypeTVA';



DBQuery(queryTable,tableResult,"IdTable");
DBQueryPlsusp(queryplatsSupendus,platsSupendus,"Label", "Quantite", "Prix");
DBQuery(querytva,tva,"TauxTVA");


/*
 * Fonctions de query select pour récupérer les données depuis la DB SQL
 */
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


/*
 * Spécification de la ressource à retourner par le serveur
 * Génération dynamique de la page (template EJS)
 */
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