//Declaração de Usuarios padão
const usuariosPadao = [
  { id: 0, nome: 'admin', senha: '123' },
  { id: 1, nome: 'admin', senha: 'admin' },
];

const usuariosSalvos = localStorage.getItem('usuarios');
let usuarios = usuariosPadao;
if (usuariosSalvos) {
  usuarios = JSON.parse(usuariosSalvos);
}

//Siatema de Login
if (pagina === 'index.html') {
  const telaLogin = document.querySelector('.telaLogin');
  const nomeLogin = document.querySelector('.input-nomeLogin');
  const senhaLogin = document.querySelector('.input-senhaLogin');

  telaLogin.addEventListener('submit', (event) => {
    event.preventDefault();
    const nome = nomeLogin.value.trim();
    const senha = senhaLogin.value.trim();

    const login = usuarios.find(
      (user) => user.nome == nome && user.senha == senha,
    );

    if (login) {
      localStorage.setItem('Logado', 'true');
      localStorage.setItem('Usuario', login.nome);
      window.location.replace('estoque.html');
    }
  });
}

//Tabela de Usuarios

//Salvar usuarios
const salvarUsuarios = () => {
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
};
//Renderizar Tabela
const tabelaUsuarios = document.querySelector('.TabelaUsuarios');
const renderizarTabela = (tabela = []) => {
  const usuariosHTML = tabela.map((usuarios, i) => {
    return `<tr>
              <td class="tabelaID">${usuarios.id}</td>
              <td>${usuarios.nome}</td>
              <td type="password" class="tbSenha">${usuarios.senha}</td>
              <td class="opcoesTabela">
                  <button value="${usuarios.id}" class="editarTabela">Editar</button>
                  <button value="${usuarios.id}" class="excluirTabela">Excluir</button>
              </td>
            </tr>`;
  });
  tabelaUsuarios.innerHTML = usuariosHTML.join('');
};

renderizarTabela(usuarios);

//Elementos para adicionar usuarios a tabela
const botaoAdicionar = document.querySelector('.botaoAdicionar');
const formularioAdicionar = document.querySelector('.form-adicionar');
const inputNome = document.querySelector('.input-nome');
const inputSenha = document.querySelector('.input-Senha');

//Botão para revelar ou ocultar o formulario
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
  const senha = inputSenha.value.trim();
  const addUsuario = { id: id, nome: nome, senha: senha };

  if (!nome || !senha) {
    return;
  }

  alert(`O Usuario ${nome} foi adicionado`);
  usuarios.push(addUsuario);

  renderizarTabela(usuarios);
  salvarUsuarios();
  formularioAdicionar.reset();
  botaoAdicionar.textContent = 'Adicionar';
  formularioAdicionar.classList.toggle('esconder');
});

//Filtrar tabela
const formularioPesquisar = document.querySelector('.form-peaquisar');
const inputPesquisa = document.querySelector('.input-pesquisa');

formularioPesquisar.addEventListener('submit', (event) => {
  event.preventDefault();
  let busca = inputNome.value.trim();
  const pesquisaResultado = usuarios.filter(({ nome }) =>
    nome.toLowerCase().includes(busca.toLowerCase()),
  );
  renderizarTabela(pesquisaResultado);
});

//Escutar evento para editar a coluna
document.addEventListener('click', (event) => {
  if (event.target.closest('.editarTabela')) {
    const id = Number(event.target.value);
    const linha = event.target.closest('tr');
    const usuario = usuarios.find((usuario) => usuario.id === id);

    linha.innerHTML = `
                    <td class="tabelaID">${id}</td>
                    <td>
                        <input type="text" class="editarNome" value="${usuario.nome}">
                    </td>
                    <td>
                        <input type="password" class="editarSenha" value="${usuario.senha}">
                    </td>
                    <td class="opcoesTabela">
                        <button class="salvarEdicao" value="${id}">Salvar</button>
                    </td>`;
  }
});
//Salvar a edição
document.addEventListener('click', (event) => {
  if (event.target.closest('.salvarEdicao')) {
    const id = Number(event.target.value);
    const linha = event.target.closest('tr');

    const novoNome = linha.querySelector('.editarNome').value;
    const novaSenha = linha.querySelector('.editarSenha').value;

    const usuario = usuarios.find((usuario) => usuario.id === id);

    if (usuario) {
      usuario.nome = novoNome;
      usuario.senha = novaSenha;
    }
    salvarUsuarios();
    renderizarTabela(usuarios);
  }
});

//Escutar excluir para editar a coluna
document.addEventListener('click', (event) => {
  if (event.target.closest('.excluirTabela')) {
    const id = Number(event.target.value);
    usuarios = usuarios.filter((usuarios) => usuarios.id !== id);
    salvarUsuarios();
    renderizarTabela(usuarios);
  }
});
