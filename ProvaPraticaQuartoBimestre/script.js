let transacoes = [
    { id: 1, descricao: "Salário", valor: 3500.00, tipo: "Receita", data: "2025-11-01" },
    { id: 2, descricao: "Aluguel", valor: 1200.00, tipo: "Despesa", data: "2025-11-05" }
];

const form = document.getElementById('formTransacao');
const tabela = document.querySelector('#tabelaTransacoes tbody');

function renderizarTabela() {
    tabela.innerHTML = "";
    transacoes.forEach(transacao => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${transacao.id}</td>
            <td>${transacao.descricao}</td>
            <td>${transacao.valor.toFixed(2)}</td>
            <td>${transacao.tipo}</td>
            <td>${transacao.data}</td>
            <td>
                <button class="editar" onclick="editarTransacao(${transacao.id})">Editar</button>
                <button class="excluir" onclick="deletarTransacao(${transacao.id})">Excluir</button>
            </td>
        `;
        tabela.appendChild(tr);
    });

}

function adicionarTransacao(e) {
    e.preventDefault();

    const id = document.getElementById('idTransacao').value;
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const tipo = document.getElementById('tipo').value;
    const data = document.getElementById('data').value;

    if (id) {
        salvarEdicao(id, descricao, valor, tipo, data);
        return;
    }

    const novaTransacao = {
        id: transacoes.length ? transacoes[transacoes.length - 1].id + 1 : 1,
        descricao,
        valor,
        tipo,
        data
    };

    transacoes.push(novaTransacao);
    renderizarTabela();
    form.reset();


}

function editarTransacao(id) {
    const transacao = transacoes.find(t => t.id === id);
    document.getElementById('idTransacao').value = transacao.id;
    document.getElementById('descricao').value = transacao.descricao;
    document.getElementById('valor').value = transacao.valor;
    document.getElementById('tipo').value = transacao.tipo;
    document.getElementById('data').value = transacao.data;
}

function salvarEdicao(id, descricao, valor, tipo, data) {
    const index = transacoes.findIndex(t => t.id == id);
    if (index !== -1) {
        transacoes[index] = { id: parseInt(id), descricao, valor, tipo, data };
        renderizarTabela();
        form.reset();
        document.getElementById('idTransacao').value = "";


    }
}

function deletarTransacao(id) {
    if (confirm("Deseja realmente excluir esta transação?")) {
        transacoes = transacoes.filter(t => t.id !== id);
        renderizarTabela();


    }
}

// Inicializa
form.addEventListener('submit', adicionarTransacao);
renderizarTabela();
