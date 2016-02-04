var request = require('request');
var cheerio = require('cheerio');

var CepService = function () {
    this.queryCep = function (cep, callback) {
        sanitizeIncomingCep(cep);
        var form = 'cepEntrada=' + cep + '&metodo=buscarCep';
        var data = {
            'url': 'http://m.correios.com.br/movel/buscaCepConfirma.do',
            'method': 'POST',
            'encoding': 'binary',
            'headers': {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Host': 'm.correios.com.br',
                'Origin': 'http://m.correios.com.br/movel/buscaCepConfirma.do',
                'Referer': 'http://m.correios.com.br/movel/buscaCepConfirma.do',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:35.0) Gecko/20100101 Firefox/35.0',
                "accept-charset": "ISO-8859-1,utf-8;q=0.7,*;q=0.3"
            },
            'jar': true,
            'form': form
        };

        request(data, function (error, response, body) {
            var json = null;

            if (!error && response.statusCode === 200) {
                var $ = cheerio.load(body);
                var errorContainer = $('.erro');

                if (errorContainer.length) {
                    json = {
                        success: false,
                        message: errorContainer.text().trim()
                    };
                } else {
                    json = buildAddressFromCep($);
                    json.success = true;
                }
            } else {
                json = {
                    success: false,
                    message: error
                };
            }

            callback(json);
        });
    };
};

function sanitizeIncomingCep(incomingCep) {
    incomingCep = incomingCep.replace('-', '');
}

function buildAddressFromCep($) {
    var address = {};

    var logradouroContainer = $('span.resposta:contains("Logradouro:")');
    var bairroContainer = $('span.resposta:contains("Bairro:")');
    var cidadeEstadoContainer = $('span.resposta:contains("Localidade / UF:")');
    var cepContainer = $('span.resposta:contains("CEP:")');

    if (logradouroContainer.length) {
        address.logradouro = logradouroContainer.next().text().trim();
    } else {
        address.logradouro = '';
    }

    if (bairroContainer.length) {
        address.bairro = bairroContainer.next().text().trim();
    } else {
        address.bairro = '';
    }

    if (cidadeEstadoContainer.length) {
        address.cidade = cidadeEstadoContainer.next().text().trim().split('/')[0].trim();
        address.uf = cidadeEstadoContainer.next().text().trim().split('/')[1].trim();
    } else {
        address.cidade = '';
        address.uf = '';
    }

    if (cepContainer.length) {
        address.cep = cepContainer.next().text().trim();
    } else {
        address.cep = '';
    }

    return address;
}

module.exports = CepService;
