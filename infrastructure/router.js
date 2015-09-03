var fs = require('fs');

module.exports.setUpControllers = function () {
    var controllers = fs.readdirSync('./controllers/');

    for (var i = 0; i < controllers.length; i++) {
        var controller = controllers[i].replace('.js', '');
        require('../controllers/' + controller);
    }
}
