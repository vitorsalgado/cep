var app = require('../app');
var express = require('express');
var CepService = require('../services/cepService');

var router = express.Router();

router.get('/:cep', function (req, res) {
    var cepService = new CepService();

    cepService.queryCep(req.params.cep, function (response) {
        var status = response.success ? 200 : 500;
        res.status(status).json(response);
    });
});

app.use('/cep', router);

module.exports = router;
