import './styles.css';

import { TodoList } from './classes/index.js';
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList();

todoList.todos.forEach(crearTodoHtml);

console.log(todoList);