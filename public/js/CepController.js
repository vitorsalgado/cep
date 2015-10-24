angular
    .module('cep.hack')
    .controller('CepController', CepController);

function CepController($scope, CepService) {
    $scope.getCep = function() {
        $scope.loading = true;
        var cep = $scope.cepText;

        if ((cep == '' || cep == null || typeof cep == 'undefined') || cep.length < 8 || cep.length > 9) {
            handleError('Por favor, informe o CEP corretamente. Ex.: 11750000 ou 11750-000');
            $scope.loading = false;

            return;
        }

        CepService.getCep(cep,
            function(response){
                var data = response.data;

                if(data.success) {
                    $scope.cep = data.cep;
                    $scope.logradouro = data.logradouro;
                    $scope.bairro = data.bairro;
                    $scope.cidade = data.cidade;
                    $scope.uf = data.uf;
                    $scope.jsonData = JSON.stringify(data);
                    $scope.showResults = true;
                    $scope.showErrors = false;
                }else{
                    handleError(data.message);
                }

                $scope.loading = false;
            },
            function(response){
                handleError(response.data.message);
                $scope.loading = false;
            });

        $scope.showErrors = false;
    };

    handleError = function(message){
        $scope.errorContent = message;
        $scope.showErrors = true;
        $scope.focus = true;
    };
}