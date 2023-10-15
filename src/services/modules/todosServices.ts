import Http from '@/services/axios';
import type {
	IResponse,
	IReponseData,
	IApiTodo,
	ITodo,
	ITodoBasic,
	ITodoId,
	IApiTodoId,
	ITodoParamsIDs,
} from '@/interfaces';
import { parseTodo } from '@/utils/parseTodo';
import { responseToJSON } from '@/utils/responseToJSON';

const http = Http.getInstance();

export const todosServices = {
	GET_TODO: ({ listId, todoId }: ITodoParamsIDs): Promise<ITodo> => {
		return new Promise((resolve, reject) => {
			http({
				method: 'GET',
				url: `/todos/${todoId}/list/${listId}`,
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
	CREATE_TODO: (listId: string, body: ITodoBasic): Promise<ITodo> => {
		return new Promise((resolve, reject) => {
			http({
				method: 'POST',
				url: `/todos/list/${listId}`,
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
	EDIT_TODO: (params: ITodoParamsIDs, body: ITodoBasic): Promise<ITodo> => {
		return new Promise((resolve, reject) => {
			http({
				method: 'PUT',
				url: `/todos/${params.todoId}/list/${params.listId}`,
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
	DELETE_TODO: ({ listId, todoId }: ITodoParamsIDs): Promise<ITodoId> => {
		return new Promise((resolve, reject) => {
			http({
				method: 'DELETE',
				url: `/todos/${todoId}/list/${listId}`,
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
