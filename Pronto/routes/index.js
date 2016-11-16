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
var loginResult = new Object();

var queryServeur = 'select IdServeur from Serveurs';
var queryTable = 'select IdTable from Tables';
var queryLogin = 'SELECT IdServeur, Pass FROM serveurs';

DBQuery(queryServeur,serveurResult,"IdServeur");
DBQuery(queryTable,tableResult,"IdTable");
DBQueryLogin(queryLogin,loginResult);


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


function DBQueryLogin(query,receive){
    mySqlClient.query(query,
        function select(error, results, fields) {
            if ( results.length > 0 )  {
                for(i in results){
                    //receive[i]['IdServeur'] = results[ i ]['IdServeur'];
                    receive[results[ i ]['IdServeur']] = results[ i ]['Pass'];
                }

            } else console.log("Pas de données");
        });
}





/* GET home page. */
router.get('/', function(req, res,next) {
    //console.log(serveurResult);
    //console.log(tableResult);
    console.log(loginResult);
    var menu = ["Entrées","Plats","Desserts","Boissons"];
    res.render('index',{
        RestaurantName:"Resto",
        Menu:menu,
        Serveur:serveurResult,
        Table:tableResult

    });
});


module.exports = router;

