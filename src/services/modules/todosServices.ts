import Http from '@/services/axios';
import type { IResponse, ITodo, ITodoBasic, ITodoId } from '@/interfaces';

const http = Http.getInstance();

export const GET_TODOS = (): Promise<ITodo[]> => {
	return new Promise((resolve, reject) => {
		http({
			method: 'GET',
			url: '/todos',
		})
			.then((res: IResponse<ITodo[]>) => {
				resolve(res.data.content);
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
			.then((res: IResponse<ITodo>) => {
				resolve(res.data.content);
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
			.then((res: IResponse<ITodo>) => {
				resolve(res.data.content);
			})
			.catch((err: PromiseRejectedResult) => {
				reject(err);
			});
	});
};

export const EDIT_TODO = (id: string, body: ITodoBasic): Promise<ITodo> => {
	return new Promise((resolve, reject) => {
		http({
			method: 'POST',
			url: `/todos/${id}`,
			data: body,
		})
			.then((res: IResponse<ITodo>) => {
				resolve(res.data.content);
			})
			.catch((err: PromiseRejectedResult) => {
				reject(err);
			});
	});
};

export const DELETE_TODO = (id: string): Promise<ITodoId> => {
	return new Promise((resolve, reject) => {
		http({
			method: 'POST',
			url: `/todos/${id}`,
		})
			.then((res: IResponse<ITodoId>) => {
				resolve(res.data.content);
			})
			.catch((err: PromiseRejectedResult) => {
				reject(err);
			});
	});
};
