$(document).ready(function () {

    $('#btn-search').click(function (e) {
        e.preventDefault();
        queryCep();
    });

    $('#txt-cep')
        .keydown(function (e) {
            var keyCode = (event.keyCode ? event.keyCode : event.which);

            if (keyCode == '13') {
                queryCep();
            }
        })
        .focus();
});

function queryCep() {
    var txtCep = $('#txt-cep');
    var body = $('html');
    var btnQuery = $('#btn-search');

    var cep = txtCep.val();
    var errorContainer = $('#error-container');
    var resultsContainer = $('#container-results');

    errorContainer.hide();
    resultsContainer.hide();

    if ((cep == '' || cep == null || typeof cep == 'undefined') || cep.length < 8 || cep.length > 9) {
        errorContainer
            .html('Por favor, informe o CEP corretamente. Ex.: 11750000 ou 11750-000')
            .show();
        txtCep.focus();
    } else {
        body.css('cursor', 'wait');
        txtCep.css('cursor', 'wait');
        btnQuery.css('cursor', 'wait');

        $.ajax({
            url: '/cep/' + cep,
            method: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function (response) {
                if(response.success) {
                    $('#td-cep').html(response.cep);
                    $('#td-logradouro').html(response.logradouro);
                    $('#td-bairro').html(response.bairro);
                    $('#td-cidade').html(response.cidade);
                    $('#td-uf').html(response.uf);
                    $('#json-data').html(JSON.stringify(response));

                    errorContainer.hide();
                    resultsContainer.show();
                }else{
                    handleError(response.message);
                }
            },
            error: function (response) {
                handleError(response.responseJSON.message);
            },
            complete: function () {
                body.css('cursor', 'default');
                txtCep.css('cursor', '');
                btnQuery.css('cursor', 'pointer');
            }
        });

        errorContainer.hide();
    }
}

function handleError(message){
    $('#error-container')
        .html(message)
        .show();
    $('#container-results').hide();
    $('#txt-cep').focus();
}