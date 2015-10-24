angular
    .module('cep.hack')
    .service('CepService', CepService);

function CepService($http) {
    this.getCep = function (cep, onSuccess, onError) {
        $http.get('/cep/' + cep).then(onSuccess, onError);
    }
}