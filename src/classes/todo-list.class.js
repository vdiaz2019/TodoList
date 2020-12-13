import { Todo } from "./todo.class";

export class TodoList {
    
    constructor() {
        this.cargarLocalStorage();
    }

    nuevoTodo(todo) {
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    eliminarTodo(id) {
        this.todos = this.todos.filter(todo => todo.id != id);
        this.guardarLocalStorage();
    }

    marcarCompletado(id) {
        for (const todo of this.todos) {
            if (todo.id == id) {
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados() {
        this.todos = this.todos.filter(todo => todo.completado != false);
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {
        localStorage.setItem('todoList', JSON.stringify(this.todos));
    }

    cargarLocalStorage() {

        this.todos = localStorage.getItem('todoList') 
                ? JSON.parse(localStorage.getItem('todoList')) 
                : [];

        this.todos = this.todos.map(Todo.fromJson);
    }
}