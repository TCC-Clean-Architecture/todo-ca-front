import type { IApiTodo, ITodo } from '@/interfaces';

export const parseTodos = (todos: IApiTodo[]): ITodo[] => {
	return todos.map((todo) => parseTodo(todo));
};

export const parseTodo = (todo: IApiTodo): ITodo => {
	return {
		id: todo._id,
		name: todo.name,
		description: todo.description,
		status: todo.status,
		createdAt: todo.createdAt,
	};
};
