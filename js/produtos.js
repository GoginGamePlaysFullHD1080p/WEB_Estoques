//capturar o nome de usuario utilizado no login
const nomeLogado = localStorage.getItem('Usuario');
const nomeExibir = document.querySelector('.nomeUsuario');
nomeExibir.innerHTML = `${nomeLogado}`;

//Criando uma Tabela Para exibir no site
const produtosPardao = [
  { id: 1783182968126, nome: 'Notebook', quantidade: 5 },
  { id: 1683182268123, nome: 'Celular', quantidade: 10 },
  { id: 7187182768187, nome: 'TV', quantidade: 6 },
  { id: 2183122948720, nome: 'Micro-ondas', quantidade: 9 },
  {
    id: 5783182968126,
    nome: 'Switch de Mesa TP-Link 5 Portas 10/100Mbps - LS1005',
    quantidade: 1,
  },
  { id: 9703184988127, nome: 'Notebook', quantidade: 7 },
];

const produtosSalvos = localStorage.getItem('produtos');

let produtos = produtosPardao;

if (produtosSalvos) {
  produtos = JSON.parse(produtosSalvos);
}

//Salvar tabela
const salvarProduto = () => {
  localStorage.setItem('produtos', JSON.stringify(produtos));
};

//Renderizar Tabela de Produtos
const tabelaProdutos = document.querySelector('.TabelaProdutos');
const renderizarTabela = (tabela = []) => {
  const produtosHtml = tabela.map((produtos, i) => {
    return `<tr>
              <td class="tabelaID">${produtos.id}</td>
              <td>${produtos.nome}</td>
              <td>${produtos.quantidade}</td>
              <td class="opcoesTabela">
                  <button value="${produtos.id}" class="editarTabela">Editar</button>
                  <button value="${produtos.id}" class="excluirTabela">Excluir</button>
              </td>
            </tr>`;
  });
  tabelaProdutos.innerHTML = produtosHtml.join('');
};

renderizarTabela(produtos);

//Elementos para adicionar um Produto a Tabela
const botaoAdicionar = document.querySelector('.botaoAdicionar');
const formularioAdicionar = document.querySelector('.form-adicionar');
const inputNome = document.querySelector('.input-nome');
const inputQuantidade = document.querySelector('.input-quantidade');

botaoAdicionar.addEventListener('click', () => {
  formularioAdicionar.classList.toggle('esconder');
  //if e else em uma unica linha com Ternario
  formularioAdicionar.classList.contains('esconder')
    ? (botaoAdicionar.textContent = 'Adicionar')
    : (botaoAdicionar.textContent = 'Cancelar');
});

formularioAdicionar.addEventListener('submit', (event) => {
  event.preventDefault();
  const id = Date.now();
  const nome = inputNome.value.trim();
  const quantidade = Number(inputQuantidade.value);
  const addProduto = { id: id, nome: nome, quantidade: quantidade };

  if (!nome || !quantidade) {
    return;
  }

  alert('O Produto ' + nome + ' Foi adicionado');
  produtos.push(addProduto);

  renderizarTabela(produtos);
  salvarProduto();
  formularioAdicionar.reset();
  botaoAdicionar.textContent = 'Adicionar';
  formularioAdicionar.classList.toggle('esconder');
});

//filtro na Tabela
const formularioPesquisar = document.querySelector('.form-peaquisar');
const inputPesquisa = document.querySelector('.input-pesquisa');

formularioPesquisar.addEventListener('submit', (event) => {
  event.preventDefault();
  let busca = inputPesquisa.value;
  const pesquisaResultado = produtos.filter(({ nome }) =>
    nome.toLowerCase().includes(busca.toLowerCase()),
  );
  renderizarTabela(pesquisaResultado);
});

//Escuta o evento para editar a coluna correspondente

const botaoExcluir = document.querySelector('.excluirTabela');

//ESsuta o evento para excluir o intem correspondente na tabela
document.addEventListener('click', (event) => {
  if (event.target.closest('.excluirTabela')) {
    const id = Number(event.target.value);

    // let excluir = botaoExcluir.value;
    // produtos.splice(id, 1);
    produtos = produtos.filter((produtos) => produtos.id !== id);
    // console.log(excluir);
    // console.log(botaoExcluir);
    salvarProduto();
    renderizarTabela(produtos);
  }
});

document.addEventListener('click', (event) => {
  if (event.target.closest('.editarTabela')) {
    const id = Number(event.target.value);
    const linha = event.target.closest('tr');
    const produto = produtos.find((produto) => produto.id === id);

    linha.innerHTML = `
                    <td class="tabelaID">${id}</td>
                    <td>
                        <input type="text" class="editarNome" value="${produto.nome}">
                    </td>
                    <td>
                        <input type="number" class="editarQuantidade" value="${produto.quantidade}">
                    </td>
                    <td class="opcoesTabela">
                        <button class="salvarEdicao" value="${id}">Salvar</button>
                    </td>`;
  }
});

document.addEventListener('click', (event) => {
  if (event.target.closest('.salvarEdicao')) {
    const id = Number(event.target.value);
    const linha = event.target.closest('tr');

    const novoNome = linha.querySelector('.editarNome').value;
    const novaQuantidade = Number(
      linha.querySelector('.editarQuantidade').value,
    );

    const produto = produtos.find((produto) => produto.id === id);

    if (produto) {
      produto.nome = novoNome;
      produto.quantidade = novaQuantidade;
    }
    salvarProduto();
    renderizarTabela(produtos);
  }
});
