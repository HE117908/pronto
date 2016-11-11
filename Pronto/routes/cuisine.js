/**
 * Created by francois on 11/11/2016.
 */

var express = require('express');
var router = express.Router();


router.get('/cuisine', function (req, res,next) {
    res.sendFile( __dirname + "/" + "cuisine.html" );
})

module.exports = router;
