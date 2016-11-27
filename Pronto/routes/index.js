/**
 * Created by francois on 11/11/2016.
 */

var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var mySqlClient = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "mpolkiuj",
    database : "pronto"
});

var serveurResult = [];
var tableResult = [];
var entreesResult = new Object();
var platsResult = new Object();
var dessertsResult = new Object();
var boissonsResult = new Object();
var accompagnementsResult = new Object();
var supplementsResult = new Object();

var queryServeur = 'SELECT IdServeur FROM serveurs ORDER BY IdServeur ASC';
var queryTable = 'SELECT IdTable FROM tables ORDER BY IdTable ASC';
var queryEntrees = 'SELECT IdPlat, NomPlat, Prix, catplats.NomCatPlat FROM plats INNER JOIN catplats ON plats.IdCatPlat = catplats.IdCatPlat WHERE catplats.NomCatPlat = "entrees" ORDER BY catplats.NomCatPlat ASC';
var queryPlats = 'SELECT IdPlat, NomPlat, Prix, catplats.NomCatPlat FROM plats INNER JOIN catplats ON plats.IdCatPlat = catplats.IdCatPlat WHERE catplats.NomCatPlat = "plats" ORDER BY catplats.NomCatPlat ASC';
var queryDesserts = 'SELECT IdPlat, NomPlat, Prix, catplats.NomCatPlat FROM plats INNER JOIN catplats ON plats.IdCatPlat = catplats.IdCatPlat WHERE catplats.NomCatPlat = "desserts" ORDER BY catplats.NomCatPlat ASC';
var queryBoissons = 'SELECT boissons.IdBoisson, boissons.NomBoisson, boissons.Prix, NomCatBoisson FROM boissons INNER JOIN catboissons ON boissons.IdCatBoisson = catboissons.IdCatBoisson ORDER BY catboissons.IdCatBoisson ASC, boissons.IdBoisson ASC';
var queryAccompagnements = 'SELECT * FROM accompagnements ORDER BY IdAcc ASC';
var querySupplements = 'SELECT * FROM supplements ORDER BY IdSupp ASC';

DBQuery(queryServeur,serveurResult,"IdServeur");
DBQuery(queryTable,tableResult,"IdTable");
DBQueryQuatreVar(queryEntrees,entreesResult,'IdPlat','NomPlat','Prix','NomCatPlat');
DBQueryQuatreVar(queryPlats,platsResult,'IdPlat','NomPlat','Prix','NomCatPlat');
DBQueryQuatreVar(queryDesserts,dessertsResult,'IdPlat','NomPlat','Prix','NomCatPlat');
DBQueryQuatreVar(queryBoissons,boissonsResult,'IdBoisson','NomBoisson','Prix','NomCatBoisson');
DBQueryDeuxVar(queryAccompagnements,accompagnementsResult,'IdAcc','NomAcc');
DBQueryTroisVar(querySupplements,supplementsResult,'IdSupp','NomSupp','Prix');



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

function DBQueryDeuxVar(query,receive,id,nom){
    mySqlClient.query(query,
        function select(error, results, fields) {
            if ( results.length > 0 )  {
                for(i in results){
                    receive[results[ i ][id]] = [results[ i ][id],results[ i ][nom]];
                }

            } else console.log("Pas de données");
        });
}

function DBQueryTroisVar(query,receive,id,nom,prix){
    mySqlClient.query(query,
        function select(error, results, fields) {
            if ( results.length > 0 )  {
                for(i in results){
                    receive[results[ i ][id]] = [results[ i ][id],results[ i ][nom],results[ i ][prix]];
                }

            } else console.log("Pas de données");
        });
}

function DBQueryQuatreVar(query,receive,id,nom,prix,cat){
    mySqlClient.query(query,
        function select(error, results, fields) {
            if ( results.length > 0 )  {
                for(i in results){
                    receive[results[ i ][id]] = [results[ i ][nom],results[ i ][prix],results[ i ][cat]];
                }

            } else console.log("Pas de données");
        });
}



/* GET home page. */
router.get('/', function(req, res,next) {
    console.log(serveurResult);
    console.log(tableResult);
    console.log(entreesResult);
    console.log(platsResult);
    console.log(dessertsResult);
    console.log(boissonsResult);
    console.log(accompagnementsResult);
    console.log(supplementsResult);
    var menu = ["Entrées","Plats","Desserts","Boissons"];
    res.render('index',{
        RestaurantName:"Resto",
        Menu:menu,
        Serveur:serveurResult,
        Table:tableResult,
        Entrees:entreesResult,
        Plats:platsResult,
        Desserts:dessertsResult,
        Boissons:boissonsResult,
        Accompagnements:accompagnementsResult,
        Supplements:supplementsResult

    });
});


module.exports = router;

