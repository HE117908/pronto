var express = require('express');
var router = express.Router();


router.get('/CaisseEnregistreuse', function (req, res,next) {
    res.sendFile( __dirname + "/" + "CaisseEnregistreuse.html" );
})

module.exports = router;