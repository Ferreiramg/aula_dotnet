$(document).ready(function () {
    listarGrid();
});

function listarGrid() {
    $.get('http://localhost:5000/Colaborador/Listar')
        .done(function (resposta) {
            renderTable(resposta);
        })
        .fail(function (erro, mensagem, excecao) {
            alert(mensagem + ': ' + excecao);
        });
}

function renderTable(response) {

    for (i = 0; i < response.length; i++) {
        let dados = response[i];

        $('#grid').append($('<tr></tr>').attr('id', dados.id));
        $('#' + dados.id).append($('<td></td>').html(dados.id));
        $('#' + dados.id).append($('<td></td>').html(dados.nome));
        $('#' + dados.id).append($('<td></td>').html(dados.idCargoNavigation.nome));
        $('#' + dados.id).append($('<td></td>').html(dados.salario));
    }
}