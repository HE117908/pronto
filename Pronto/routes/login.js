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


router.get('/login', function (req, res,next) {
    res.sendFile( __dirname + "/" + "login.html" );
})

module.exports = router;
