let produtos = [
    {nome: 'Notebook', quantidade: 5},
    {nome: 'Celular', quantidade: 10},
    {nome: 'TV', quantidade: 6},
    {nome: 'Micro-ondas', quantidade: 9},
    {nome: 'Switch de Mesa TP-Link 5 Portas 10/100Mbps - LS1005', quantidade: 1},
    {nome: 'Notebook', quantidade: 5}
    ,]

let produtos1 = ['Notebook', 'Celular', 'TV', 'Micro-ondas', 'Switch de Mesa TP-Link 5 Portas 10/100Mbps - LS1005'];
let quantidade = [5, 10, 6, 9, 1];
let id = [2, 3, 4, 5, 6]

tabelaProdutos = document.querySelector('.TabelaProdutos');

const renderizarTabela = () =>{ 
    const produtosHtml = produtos.map((produtos , i)=>{
        return `<tr>
                    <th>${i}</th>
                    <td>${produtos.nome}</td>
                    <td>${produtos.quantidade}</td>
                    <td>
                        <button>Editar</button>
                        <button>Excluir</button>
                    </td>
                    </tr>`;
    });

    tabelaProdutos.innerHTML = produtosHtml.join('');

};

renderizarTabela();

console.log("Teste");