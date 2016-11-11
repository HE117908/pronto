/**
 * Created by francois on 11/11/2016.
 */

var express = require('express');
var router = express.Router();


router.get('/bar', function (req, res,next) {
    res.sendFile( __dirname + "/" + "bar.html" );
})

module.exports = router;
