import Http from '@/services/axios';
import type {
	IResponse,
	IReponseData,
	IApiTodo,
	ITodo,
	ITodoBasic,
	ITodoId,
	IApiTodoId,
} from '@/interfaces';
import { parseTodo, parseTodos } from '@/utils/parseTodo';
import { responseToJSON } from '@/utils/responseToJSON';

const http = Http.getInstance();

export const todosServices = {
	GET_TODOS: (): Promise<ITodo[]> => {
		return new Promise((resolve, reject) => {
			http({
				method: 'GET',
				url: '/todos',
				transformResponse: [
					responseToJSON,
					(data: IReponseData<IApiTodo[]>) => ({ ...data, content: parseTodos(data.content) }),
				],
			})
				.then((res: IResponse<ITodo[]>) => {
					resolve(res.data.content);
				})
				.catch((err: PromiseRejectedResult) => {
					reject(err);
				});
		});
	},
	GET_TODO: (id: string): Promise<ITodo> => {
		return new Promise((resolve, reject) => {
			http({
				method: 'GET',
				url: `/todos/${id}`,
				transformResponse: [
					responseToJSON,
					(data: IReponseData<IApiTodo>) => ({ ...data, content: parseTodo(data.content) }),
				],
			})
				.then((res: IResponse<ITodo>) => {
					resolve(res.data.content);
				})
				.catch((err: PromiseRejectedResult) => {
					reject(err);
				});
		});
	},
	CREATE_TODO: (body: ITodoBasic): Promise<ITodo> => {
		return new Promise((resolve, reject) => {
			http({
				method: 'POST',
				url: '/todos',
				data: body,
				transformResponse: [
					responseToJSON,
					(data: IReponseData<IApiTodo>) => ({ ...data, content: parseTodo(data.content) }),
				],
			})
				.then((res: IResponse<ITodo>) => {
					resolve(res.data.content);
				})
				.catch((err: PromiseRejectedResult) => {
					reject(err);
				});
		});
	},
	EDIT_TODO: (id: string, body: ITodoBasic): Promise<ITodo> => {
		return new Promise((resolve, reject) => {
			http({
				method: 'PUT',
				url: `/todos/${id}`,
				data: body,
				transformResponse: [
					responseToJSON,
					(data: IReponseData<IApiTodo>) => ({ ...data, content: parseTodo(data.content) }),
				],
			})
				.then((res: IResponse<ITodo>) => {
					resolve(res.data.content);
				})
				.catch((err: PromiseRejectedResult) => {
					reject(err);
				});
		});
	},
	DELETE_TODO: (id: string): Promise<ITodoId> => {
		return new Promise((resolve, reject) => {
			http({
				method: 'DELETE',
				url: `/todos/${id}`,
				transformResponse: [
					responseToJSON,
					(data: IReponseData<IApiTodoId>) => ({ ...data, content: { id: data.content._id } }),
				],
			})
				.then((res: IResponse<ITodoId>) => {
					resolve(res.data.content);
				})
				.catch((err: PromiseRejectedResult) => {
					reject(err);
				});
		});
	},
};
