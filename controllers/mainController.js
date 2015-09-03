var app = require('../app');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index');
});

app.use('/', router);

module.exports = router;
