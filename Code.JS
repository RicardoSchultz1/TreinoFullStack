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

            const span = document.createElement('span');
            span.textContent = item;
            li.appendChild(span);

            const btnEditar = document.createElement('button');
            btnEditar.textContent = 'Editar';
            btnEditar.onclick = () => {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = item;

                const btnSalvar = document.createElement('button');
                btnSalvar.textContent = 'Salvar';
                btnSalvar.onclick = () => {
                    if (input.value.trim() !== '') {
                        itens[index] = input.value;
                        salvarLista();
                        atualizarLista();
                    }
                };

                li.innerHTML = '';
                li.appendChild(input);
                li.appendChild(btnSalvar);
            };

            const btnRemover = document.createElement('button');
            btnRemover.textContent = 'Remover';
            btnRemover.onclick = () => {
                itens.splice(index, 1);
                salvarLista();
                atualizarLista();
            };

            li.appendChild(btnEditar);
            li.appendChild(btnRemover);
            lista.appendChild(li);
        });
    }

    atualizarLista();
});
