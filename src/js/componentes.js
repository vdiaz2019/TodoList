import {Todo} from '../classes';
import {todoList} from '../index';

const divTodolList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrarCompletado = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {

    // Referencias en el HTML
    const htmlTodo = `
        <li class="${todo.completado ? 'completed' : ''}" data-id="${todo.id}">
			<div class="view">
				<input class="toggle" type="checkbox" ${todo.completado ? 'checked' : ''}>
				<label>${todo.tarea}</label>
				<button class="destroy"></button>
			</div>
			<input class="edit" value="Rule the web">
		</li>
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodolList.append(div.firstElementChild);

    return div.firstElementChild;
}

txtInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        
        const todoNuevo = new Todo(txtInput.value);
        todoList.nuevoTodo(todoNuevo);

        crearTodoHtml(todoNuevo);

        txtInput.value = '';
    }
});

divTodolList.addEventListener('click', (event) => {
    const nomnbreElemento = event.target.localName; // label, input, button
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if (nomnbreElemento.includes('input')) {
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    } else if (nomnbreElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        divTodolList.removeChild(todoElemento);
    }
});

btnBorrarCompletado.addEventListener('click', () => {
    const tareasCompletadas = document.querySelectorAll('.completed');
    console.log(tareasCompletadas);

    for (const completado of tareasCompletadas) {
        divTodolList.removeChild(completado);
    }

    todoList.eliminarCompletados();
    
});

ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;

    if (!filtro) { return; }

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const elemento of divTodolList.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch(filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;
        }
    }
})