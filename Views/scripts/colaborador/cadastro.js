$(document).ready(function () {
    listarCargo();

    //Listern events
    $('#salvar').on('click', submit);
    $('#filtro').on('click', filtrar);
    $('#limpar').on('click', limpar);
});

function listarCargo() {
    $.get('http://localhost:5000/Cargo/Listar')
        .done(function (resposta) {
            for (i = 0; i < resposta.length; i++) {
                $('#cargo').append($('<option></option>').val(resposta[i].id).html(resposta[i].nome));
                $('#f_cargo').append($('<option></option>').val(resposta[i].nome).html(resposta[i].nome));
            }
        })
        .fail(function (erro, mensagem, excecao) {
            alert(mensagem + ': ' + excecao);
        });
}

function submit(event) {
    event.preventDefault();
    const data = {
        Nome: $('#nome').val(),
        Salario: $('#salario').val(),
        idCargo: $('#cargo option:selected').val()
    };

    fetch('http://localhost:5000/Colaborador/Store',
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(async res => await res.json())
        .then(json => renderTable([json]))
        .catch(error => console.log(error));

}

function filtrar(event) {
    var nome = $('#f_nome').val();
    var cargo = $('#f_cargo option:selected').val();

    $.get(`http://localhost:5000/Colaborador/filter?nome=${nome}&cargo=${cargo}`)
        .done(function (resposta) {
            $('#grid tr').remove();
            renderTable(resposta)
        })
        .fail(function (erro, mensagem, excecao) {
            alert(mensagem + ': ' + excecao);
        });
    event.preventDefault();
}

function limpar(event) {
    window.location.reload();
}

function sortTable(event, n) {
    $(event.target).closest('i').toggleClass('bi-chevron-down bi-chevron-up')
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("table");
    switching = true;
    dir = "asc";
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {

            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[n];
            y = rows[i + 1].getElementsByTagName("td")[n];

            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}