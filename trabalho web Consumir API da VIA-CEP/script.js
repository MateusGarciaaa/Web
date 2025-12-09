// Função para buscar o endereço pelo CEP
document.getElementById('cep').addEventListener('blur', function () {
    const cep = this.value.replace(/\D/g, ''); // Remove qualquer caractere não numérico
    if (cep.length === 8) { // Verifica se o CEP tem 8 dígitos
        // Fazendo a requisição para a API ViaCep
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    alert("CEP não encontrado!");
                } else {
                    // Preenche os campos com os dados da API
                    document.getElementById('logradouro').value = data.logradouro || '';
                    document.getElementById('bairro').value = data.bairro || '';
                    document.getElementById('cidade').value = data.localidade || '';
                    document.getElementById('estado').value = data.uf || '';
                }
            })
            .catch(error => {
                console.error('Erro ao buscar o CEP:', error);
                alert('Ocorreu um erro ao buscar os dados.');
            });
    } else {
        alert("CEP inválido. Por favor, insira um CEP válido com 8 dígitos.");
    }
});
