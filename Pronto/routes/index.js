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


/* GET home page. */
router.get('/', function(req, res,next) {
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


module.exports = router;

