var http = require('http');

module.exports.startHttpServer = function (app) {
    var port = process.env.PORT || 3000;
    var server = http.createServer(app);

    server.listen(port, function () {
        console.log('server is online and listening on ' + port);
    });

    server.on('error', onError);
}

function onError(error) {
    var port = process.env.PORT || 3000;

    if (error.syscall !== 'listen') {
        throw error;
    }

    switch (error.code) {
        case 'EACCES':
            console.error('elevated privileges are required');
            process.exit(1);
            break;

        case 'EADDRINUSE':
            console.error(port + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
