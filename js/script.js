resumo();
exibir();

/*Cadastrar Salário */
document.getElementById("casl").addEventListener("click", function () {
    var salario = document.getElementById("salario").value;

    if (salario === "") {
        alert("Digite um salário!");
        return;
    }
    else if (isNaN(salario)) {
        alert("Digite apenas números.")
        return
    }
    localStorage.setItem("salario", salario);
    alert("Salário cadastrado.");
    document.getElementById("salario").value = "";

    exibir()
    resumo()


});


/*Cadastrar Despesa */
document.getElementById("formDespesas").addEventListener("submit", function (event) {
    event.preventDefault();

    var nome = document.getElementById("nome").value
    var data = document.getElementById("data").value
    var valor = document.getElementById("valor").value

    if (data === "" || nome === "" || isNaN(valor) || valor === "") {
        alert("Preencha todos os campos de modo correto.");
        return;
    }

    var despesa = {
        data: data,
        nome: nome,
        valor: valor
        /*Cria um objeto */
    }

    var listaDespesas = JSON.parse(localStorage.getItem("lista")) || [];
    listaDespesas.push(despesa);
    localStorage.setItem("lista", JSON.stringify(listaDespesas));
    document.getElementById("formDespesas").reset();

    exibir();
    resumo();
});

function exibir() {
    var listaDespesas = JSON.parse(localStorage.getItem('lista')) || []
    var output = document.getElementById("output")
    output.innerHTML = ""
    for (let i = 0; i < listaDespesas.length; i++) {
        let li = document.createElement('li')
        li.textContent = 'Data: ' + listaDespesas[i].data + ' Nome: ' + listaDespesas[i].nome + ' Valor: R$' + listaDespesas[i].valor
        output.appendChild(li)
    }
}

function resumo() {
    var resumo = document.getElementById("resumo")
    resumo.innerHTML = ""

    var salario = parseFloat(localStorage.getItem("salario"))
    var listaDespesas = JSON.parse(localStorage.getItem("lista")) || []
    var totalDespesas = 0;

    for (let i = 0; i < listaDespesas.length; i++) {
        totalDespesas += parseFloat(listaDespesas[i].valor);
    }

    let saldoFinal = salario - totalDespesas;

    let p1 = document.createElement('p');
    p1.textContent = "Salário: R$ " + salario.toFixed(2);

    let p2 = document.createElement('p');
    p2.textContent = "Total de Despesas: R$ " + totalDespesas.toFixed(2);

    let p3 = document.createElement('p');
    p3.textContent = "Saldo Final: R$ " + saldoFinal.toFixed(2);

    resumo.appendChild(p1);
    resumo.appendChild(p2);
    resumo.appendChild(p3);
}

function deletarTodas() {
    if (confirm("Tem certeza que deseja apagar TODAS as despesas?")) {
        localStorage.removeItem("lista");
        exibir();
        resumo();
    }
}
function deletar() {
    var lista = JSON.parse(localStorage.getItem("lista")) || [];
    if (lista.length === 0) {
        alert("Não há despesas para excluir!");
        return;
    }
    lista.shift();
    localStorage.setItem("lista", JSON.stringify(lista));

    exibir();
    resumo();
}

function limpar() {
    localStorage.removeItem('salario');
    localStorage.removeItem('lista');

    document.getElementById("output").innerHTML = "";
    document.getElementById("resumo").innerHTML = ""; 

   
    exibir();
    resumo();
}