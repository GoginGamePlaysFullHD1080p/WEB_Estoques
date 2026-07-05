//Declaração de Usuarios padão
const usuariosPadao = [
  { id: 0, nome: 'admin', senha: '123' },
  { id: 0, nome: 'testeUsuario', senha: '456' },
];

const usuariosSalvos = localStorage.getItem('usuarios');
let usuarios = usuariosPadao;
if (usuariosSalvos) {
  usuarios = usuariosSalvos;
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
              <td type="password" calss="tbSenha">${usuarios.senha}</td>
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
