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

    // --- SIMULAÇÃO DA CHAMADA DA API (Método: GET) ---
    /*
    fetch('https://api.exemplo.com/transacoes', { method: 'GET' })
        .then(response => response.json())
        .then(data => console.log('Transações carregadas:', data))
        .catch(error => console.error('Erro na chamada da API:', error));
    */
    // --- FIM DA SIMULAÇÃO ---
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

    // --- SIMULAÇÃO DA CHAMADA DA API (Método: POST) ---
    /*
    fetch('https://api.exemplo.com/transacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaTransacao)
    })
    .then(response => response.json())
    .then(data => console.log('Transação criada com sucesso:', data))
    .catch(error => console.error('Erro na chamada da API:', error));
    */
    // --- FIM DA SIMULAÇÃO ---
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

        // --- SIMULAÇÃO DA CHAMADA DA API (Método: PUT) ---
        /*
        fetch(`https://api.exemplo.com/transacoes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(transacoes[index])
        })
        .then(response => response.json())
        .then(data => console.log('Transação atualizada:', data))
        .catch(error => console.error('Erro na chamada da API:', error));
        */
        // --- FIM DA SIMULAÇÃO ---
    }
}

// Função DELETE - exclui transação
function deletarTransacao(id) {
    if (confirm("Deseja realmente excluir esta transação?")) {
        transacoes = transacoes.filter(t => t.id !== id);
        renderizarTabela();

        // --- SIMULAÇÃO DA CHAMADA DA API (Método: DELETE) ---
        /*
        fetch(`https://api.exemplo.com/transacoes/${id}`, {
            method: 'DELETE'
        })
        .then(() => console.log('Transação excluída com sucesso.'))
        .catch(error => console.error('Erro na chamada da API:', error));
        */
        // --- FIM DA SIMULAÇÃO ---
    }
}

form.addEventListener('submit', adicionarTransacao);
renderizarTabela();
