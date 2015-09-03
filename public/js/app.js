$(document).ready(function () {

    $('#btn-search').click(function (e) {
        e.preventDefault();
        queryCep();
    });

    $('#txt-cep').keydown(function(e){
        var keyCode = (event.keyCode ? event.keyCode : event.which);

        if(keyCode == '13'){
            queryCep();
        }
    });

});

function queryCep(){
    var cep = $('#txt-cep').val();
    var errorContainer = $('#error-container');
    var resultsContainer = $('#container-results');

    errorContainer.hide();
    resultsContainer.hide();

    if ((cep == '' || cep == null || typeof cep == 'undefined') ||cep.length < 8 || cep.length > 9) {
        errorContainer
            .html('Por favor, informe o CEP corretamente. Ex.: 11750000 ou 11750-000')
            .show();
    }else{
        $.ajax({
            url: '/cep/' + cep,
            method: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function (response) {
                $('#td-cep').html(response.data.cep);
                $('#td-logradouro').html(response.data.logradouro);
                $('#td-bairro').html(response.data.bairro);
                $('#td-cidade').html(response.data.cidade);
                $('#td-uf').html(response.data.uf);
                $('#json-data').html(JSON.stringify(response.data));

                errorContainer.hide();
                resultsContainer.show();
            },
            error: function(response){
                errorContainer
                    .html(response.message)
                    .show();
                resultsContainer.hide();
            }
        });

        errorContainer.hide();
    }
}