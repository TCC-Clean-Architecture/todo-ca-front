import { todosServices } from '@/services';
import { defineStore } from 'pinia';
import type { ITodo, ITodoBasic, ITodoId, ITodoParamsIDs } from '@/interfaces';

interface ITodosState {
	todos: ITodo[];
}

export const useTodosStore = defineStore('todos', {
	state: (): ITodosState => ({
		todos: [],
	}),
	actions: {
		getTodo(params: ITodoParamsIDs): Promise<ITodo> {
			return new Promise((resolve, reject) => {
				const storeTodo = this.todos.find((t) => t.id === params.todoId);
				if (storeTodo) {
					resolve(storeTodo);
				} else {
					todosServices
						.GET_TODO(params)
						.then((todo) => {
							resolve(todo);
						})
						.catch((err) => reject(err));
				}
			});
		},
		addTodo(listId: string, body: ITodoBasic): Promise<ITodo> {
			return new Promise((resolve, reject) => {
				todosServices
					.CREATE_TODO(listId, body)
					.then((todo) => {
						this.todos.push(todo);
						resolve(todo);
					})
					.catch((err) => reject(err));
			});
		},
		editTodo(params: ITodoParamsIDs, body: ITodoBasic): Promise<ITodo> {
			return new Promise((resolve, reject) => {
				todosServices
					.EDIT_TODO(params, body)
					.then((todo) => {
						const todoIndex = this.todos.findIndex((t) => t.id === params.todoId);
						this.todos[todoIndex] = todo;
						resolve(todo);
					})
					.catch((err) => reject(err));
			});
		},
		deleteTodo(params: ITodoParamsIDs): Promise<ITodoId> {
			return new Promise((resolve, reject) => {
				todosServices
					.DELETE_TODO(params)
					.then((deleted) => {
						this.todos = this.todos.filter((t) => t.id !== deleted.id);
						resolve(deleted);
					})
					.catch((err) => reject(err));
			});
		},
	},
});
