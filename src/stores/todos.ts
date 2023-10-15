import { TodosServices } from '@/services';
import { defineStore } from 'pinia';
import type { ITodo, ITodoBasic, ITodoId } from '@/interfaces';

interface ITodosState {
	todos: ITodo[];
}

export const useTodosStore = defineStore('todos', {
	state: (): ITodosState => ({
		todos: [],
	}),
	actions: {
		getTodos(): Promise<ITodo[]> {
			return new Promise((resolve, reject) => {
				TodosServices.GET_TODOS()
					.then((todos) => {
						this.todos = todos;
						resolve(todos);
					})
					.catch((err) => reject(err));
			});
		},
		getTodo(id: string): Promise<ITodo> {
			return new Promise((resolve, reject) => {
				const storeTodo = this.todos.find((t) => t.id === id);
				if (storeTodo) {
					resolve(storeTodo);
				} else {
					TodosServices.GET_TODO(id)
						.then((todo) => {
							resolve(todo);
						})
						.catch((err) => reject(err));
				}
			});
		},
		addTodo(body: ITodoBasic): Promise<ITodo> {
			return new Promise((resolve, reject) => {
				TodosServices.CREATE_TODO(body)
					.then((todo) => {
						this.todos.push(todo);
						resolve(todo);
					})
					.catch((err) => reject(err));
			});
		},
		editTodo(id: string, body: ITodoBasic): Promise<ITodo> {
			return new Promise((resolve, reject) => {
				TodosServices.EDIT_TODO(id, body)
					.then((todo) => {
						const todoIndex = this.todos.findIndex((t) => t.id === id);
						this.todos[todoIndex] = todo;
						resolve(todo);
					})
					.catch((err) => reject(err));
			});
		},
		deleteTodo(id: string): Promise<ITodoId> {
			return new Promise((resolve, reject) => {
				TodosServices.DELETE_TODO(id)
					.then((deletedId) => {
						this.todos = this.todos.filter((t) => t.id !== id);
						resolve(deletedId);
					})
					.catch((err) => reject(err));
			});
		},
	},
});
