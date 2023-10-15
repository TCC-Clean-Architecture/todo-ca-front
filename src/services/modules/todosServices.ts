import Http from '@/services/axios';
import type { IResponse, IApiTodo, ITodo, ITodoBasic, ITodoId, IApiTodoId } from '@/interfaces';
import { parseTodo, parseTodos } from '@/utils/parseTodo';

const http = Http.getInstance();

export const GET_TODOS = (): Promise<ITodo[]> => {
	return new Promise((resolve, reject) => {
		http({
			method: 'GET',
			url: '/todos',
		})
			.then((res: IResponse<IApiTodo[]>) => {
				resolve(parseTodos(res.data.content));
			})
			.catch((err: PromiseRejectedResult) => {
				reject(err);
			});
	});
};

export const GET_TODO = (id: string): Promise<ITodo> => {
	return new Promise((resolve, reject) => {
		http({
			method: 'GET',
			url: `/todos/${id}`,
		})
			.then((res: IResponse<IApiTodo>) => {
				resolve(parseTodo(res.data.content));
			})
			.catch((err: PromiseRejectedResult) => {
				reject(err);
			});
	});
};

export const CREATE_TODO = (body: ITodoBasic): Promise<ITodo> => {
	return new Promise((resolve, reject) => {
		http({
			method: 'POST',
			url: '/todos',
			data: body,
		})
			.then((res: IResponse<IApiTodo>) => {
				resolve(parseTodo(res.data.content));
			})
			.catch((err: PromiseRejectedResult) => {
				reject(err);
			});
	});
};

export const EDIT_TODO = (id: string, body: ITodoBasic): Promise<ITodo> => {
	return new Promise((resolve, reject) => {
		http({
			method: 'PUT',
			url: `/todos/${id}`,
			data: body,
		})
			.then((res: IResponse<IApiTodo>) => {
				resolve(parseTodo(res.data.content));
			})
			.catch((err: PromiseRejectedResult) => {
				reject(err);
			});
	});
};

export const DELETE_TODO = (id: string): Promise<ITodoId> => {
	return new Promise((resolve, reject) => {
		http({
			method: 'DELETE',
			url: `/todos/${id}`,
		})
			.then((res: IResponse<IApiTodoId>) => {
				const { content } = res.data;
				resolve({ id: content._id });
			})
			.catch((err: PromiseRejectedResult) => {
				reject(err);
			});
	});
};
