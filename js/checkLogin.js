const pagina = window.location.pathname.split('/').pop();
const usuarioLogado = localStorage.getItem('Logado');

if (usuarioLogado !== 'true' && pagina !== 'index.html') {
  window.location.replace('index.html');
}
if (usuarioLogado === 'true' && pagina === 'index.html') {
  window.location.replace('estoque.html');
}

if (pagina !== 'index.html') {
  const botaoSair = document.querySelector('.sairUsuario');
  botaoSair.addEventListener('click', () => {
    localStorage.removeItem('Logado');
    localStorage.removeItem('Usuario');
    window.location.reload();
  });
}
