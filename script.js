//Criando uma Tabela Para exibir no site
const produtosPardao = [
    {nome: 'Notebook', quantidade: 5},
    {nome: 'Celular', quantidade: 10},
    {nome: 'TV', quantidade: 6},
    {nome: 'Micro-ondas', quantidade: 9},
    {nome: 'Switch de Mesa TP-Link 5 Portas 10/100Mbps - LS1005', quantidade: 1},
    {nome: 'Notebook', quantidade: 5}
    ];

const produtosSalvos = localStorage.getItem('produtos');

let produtos = produtosPardao;

if(produtosSalvos){
    produtos = JSON.parse(produtosSalvos)
};

const salvarProduto = () =>{
    localStorage.setItem('produtos', JSON.stringify(produtos))
}

tabelaProdutos = document.querySelector('.TabelaProdutos');

const renderizarTabela = () =>{ 
    const produtosHtml = produtos.map((produtos , i)=>{
        return `<tr>
                    <td class="tabelaID">${i}</td>
                    <td>${produtos.nome}</td>
                    <td>${produtos.quantidade}</td>
                    <td class="opcoesTabela">
                        <button>Editar</button>
                        <button>Excluir</button>
                    </td>
                    </tr>`;
    });

    tabelaProdutos.innerHTML = produtosHtml.join('');

};

renderizarTabela();

//Elementos para adicionar um Produto a Tabela
const botaoAdicionar = document.querySelector('.botaoAdicionar');
const formularioAdicionar = document.querySelector('.form-adicionar');
const inputNome = document.querySelector('.input-nome');
const inputQuantidade = document.querySelector('.input-quantidade');

botaoAdicionar.addEventListener('click', () =>{
    formularioAdicionar.classList.toggle('esconder');
    //if e else em uma unica linha
    formularioAdicionar.classList.contains("esconder") ? botaoAdicionar.textContent = 'Adicionar' : botaoAdicionar.textContent = 'Cancelar';

});

formularioAdicionar.addEventListener('submit', (event) =>{
    event.preventDefault();
    const nome = inputNome.value;
    const quantidade = inputQuantidade.value;
    const addProduto = {nome: nome, quantidade: quantidade};

    alert('O Produto ' + nome + ' Foi adicionado');
    produtos.push(addProduto)

    console.log(produtos);
    renderizarTabela();
    formularioAdicionar.reset();
})

console.log("Teste");
console.log(produtos);
console.log(botaoAdicionar);