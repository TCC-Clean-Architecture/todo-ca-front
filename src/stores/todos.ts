import { todosServices } from '@/services';
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
		getTodo(id: string): Promise<ITodo> {
			return new Promise((resolve, reject) => {
				const storeTodo = this.todos.find((t) => t.id === id);
				if (storeTodo) {
					resolve(storeTodo);
				} else {
					todosServices
						.GET_TODO(id)
						.then((todo) => {
							resolve(todo);
						})
						.catch((err) => reject(err));
				}
			});
		},
		addTodo(body: ITodoBasic): Promise<ITodo> {
			return new Promise((resolve, reject) => {
				todosServices
					.CREATE_TODO(body)
					.then((todo) => {
						this.todos.push(todo);
						resolve(todo);
					})
					.catch((err) => reject(err));
			});
		},
		editTodo(id: string, body: ITodoBasic): Promise<ITodo> {
			return new Promise((resolve, reject) => {
				todosServices
					.EDIT_TODO(id, body)
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
				todosServices
					.DELETE_TODO(id)
					.then((deleted) => {
						this.todos = this.todos.filter((t) => t.id !== deleted.id);
						resolve(deleted);
					})
					.catch((err) => reject(err));
			});
		},
	},
});
