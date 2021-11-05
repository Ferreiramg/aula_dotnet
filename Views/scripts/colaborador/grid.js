$(document).ready(function () {
    Number.prototype.currency = function () {
        return this.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const tabEl2 = document.getElementById('_deleted-tab');
    const tabEl1 = document.getElementById('_actived-tab');

    tabEl2.addEventListener('shown.bs.tab', function (event) {
        $('fieldset').attr('disabled', true);
        listarGridInativos();
    });

    tabEl1.addEventListener('shown.bs.tab', function (event) {
        $('fieldset').attr('disabled', false);
    });

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

function listarGridInativos() {

    $.get('http://localhost:5000/Colaborador/ListarInativos')
        .done(function (resposta) {
            tableInativos(resposta);
        })
        .fail(function (erro, mensagem, excecao) {
            alert(mensagem + ': ' + excecao);
        });
}

function renderTable(response) {

    for (i = 0; i < response.length; i++) {
        let dados = response[i];
        $('#grid').find(`#${dados.id}`).remove();

        $('#grid').append($('<tr></tr>').attr('id', dados.id));
        $('#' + dados.id).append($('<td></td>').html(dados.id));
        $('#' + dados.id).append($('<td></td>').html(dados.nome));
        $('#' + dados.id).append($('<td></td>').html(dados.idCargoNavigation.nome));
        $('#' + dados.id).append($('<td></td>').html(dados.salario.currency()));
        $('#' + dados.id).append($('<td></td>').html(`<button data-id="${dados.id}" onclick="ver(event)" class="btn btn-sm">Visualizar</button>`));
        $('#' + dados.id).append($('<td></td>').html(`<button data-src='${JSON.stringify(dados)}' onclick="editar(event)" class="btn btn-sm btn-info">Editar</button>`));
        $('#' + dados.id).append($('<td></td>').html(`<button data-id="${dados.id}" onclick="apagar(event)" class="btn btn-sm btn-danger">Exclir</button>`));
    }
}

function tableInativos(response) {
    $('#grid_inativos').html('');
    for (i = 0; i < response.length; i++) {
        let dados = response[i];
        $('#grid_inativos').append($('<tr></tr>').attr('id', dados.id));
        $('#' + dados.id).append($('<td></td>').html(dados.id));
        $('#' + dados.id).append($('<td></td>').html(dados.nome));
        $('#' + dados.id).append($('<td></td>').html(dados.idCargoNavigation.nome));
        $('#' + dados.id).append($('<td></td>').html(dados.salario.currency()));
        $('#' + dados.id).append($('<td></td>').html(dados.deleteat));
        $('#' + dados.id).append($('<td></td>').html(`<button data-id="${dados.id}" onclick="ver(event)" class="btn btn-sm">Visualizar</button>`));
        $('#' + dados.id).append($('<td></td>').html(`<button data-id='${dados.id}' onclick="restaurar(event)" class="btn btn-sm btn-info">Restaurar</button>`));
    }
}

