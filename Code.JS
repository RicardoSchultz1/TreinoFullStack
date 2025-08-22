document.addEventListener('DOMContentLoaded', () => {
const texto = document.getElementById('Texto');
const btnAddT = document.getElementById('btnAddT');
const lista = document.getElementById('Lista');

var itens = JSON.parse(localStorage.getItem('minhaLista')) || [];

function salvarLista() {
    localStorage.setItem('minhaLista', JSON.stringify(itens));
}

btnAddT.addEventListener('click', () => {
    if (texto.value.trim() !== '') {
        itens.push(texto.value);
        salvarLista();
        atualizarLista();
        texto.value = '';
    } else {
        alert('Digite uma tarefa válida!');
    }
});

function atualizarLista() {
    lista.innerHTML = '';
    itens.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item + " "; 
        
        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.onclick = () => {
            itens.splice(index, 1);
            salvarLista();
            atualizarLista();
        };

        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.onclick = () => {
            const novoTexto = prompt("Edite a tarefa:", item);
            if (novoTexto !== null && novoTexto.trim() !== '') {
                itens[index] = novoTexto;
                salvarLista();
                atualizarLista();
            }
        };

        li.appendChild(btnEditar);
        li.appendChild(btnRemover);
        lista.appendChild(li);
    });
}

atualizarLista();
});