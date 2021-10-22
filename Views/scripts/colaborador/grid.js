$(document).ready(function () {
    Number.prototype.currency = function () {
        return this.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };
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

    console.log(response);
    for (i = 0; i < response.length; i++) {
        let dados = response[i];

        $('#grid').append($('<tr></tr>').attr('id', dados.id));
        $('#' + dados.id).append($('<td></td>').html(dados.id));
        $('#' + dados.id).append($('<td></td>').html(dados.nome));
        $('#' + dados.id).append($('<td></td>').html(dados.idCargoNavigation.nome));
        $('#' + dados.id).append($('<td></td>').html(dados.salario.currency()));
        $('#' + dados.id).append($('<td></td>').html(`<button data-id="${dados.id}" onclick="ver(event)" class="btn btn-sm btn-info">Visualizar</button>`));
        $('#' + dados.id).append($('<td></td>').html(`<button data-id="${dados.id}" onclick="apagar(event)" class="btn btn-sm btn-danger">Exclir</button>`));
    }
}

/* ACTIONS */
const apagar = (event) => {
    let id = $(event.target).data('id');

    if (confirm(`Deseja Realment Excluir o registro [${id}]?`))
        fetch('http://localhost:5000/Colaborador/Delete',
            {
                method: "DELETE",
                body: JSON.stringify(id),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(async (res) => await res.text())
            .then(text => {
                $(event.target).closest('tr').remove();
            })
            .catch(error => console.log(error));
}

const ver = (event) => {

    let id = $(event.target).data('id');
    const selectorModal = document.getElementById('exampleModal');
    const Modal = new bootstrap.Modal(selectorModal);
    Modal.show();

    fetch('http://localhost:5000/Colaborador/GetById?id=' + id)
        .then(async (res) => await res.json())
        .then(json => {
            $(selectorModal).find('.modal-body').html(
                `<ul>
                    <li>${json.id}</li>
                    <li>${json.nome}</li>
                    <li>${json.salario.currency()}</li>
                    <li>${json.idCargoNavigation.nome}</li>
                </ul>`
            );
        })
        .catch(error => console.log(error));
}