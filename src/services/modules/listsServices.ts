import Http from '@/services/axios';
import type {
	IResponse,
	IReponseData,
	IApiList,
	IList,
	IListBasic,
	IListId,
	IApiListId,
} from '@/interfaces';
import { parseList, parseLists } from '@/utils/parseList';
import { responseToJSON } from '@/utils/responseToJSON';

const http = Http.getInstance();

export const listsServices = {
	GET_LISTS: (): Promise<IList[]> => {
		return new Promise((resolve, reject) => {
			http({
				method: 'GET',
				url: '/todos/lists',
				transformResponse: [
					responseToJSON,
					(data: IReponseData<IApiList[]>) => ({ ...data, content: parseLists(data.content) }),
				],
			})
				.then((res: IResponse<IList[]>) => {
					resolve(res.data.content);
				})
				.catch((err: PromiseRejectedResult) => {
					reject(err);
				});
		});
	},
	GET_LIST: (id: string): Promise<IList> => {
		return new Promise((resolve, reject) => {
			http({
				method: 'GET',
				url: `/todos/list/${id}`,
				transformResponse: [
					responseToJSON,
					(data: IReponseData<IApiList>) => ({ ...data, content: parseList(data.content) }),
				],
			})
				.then((res: IResponse<IList>) => {
					resolve(res.data.content);
				})
				.catch((err: PromiseRejectedResult) => {
					reject(err);
				});
		});
	},
	CREATE_LIST: (body: IListBasic): Promise<IList> => {
		return new Promise((resolve, reject) => {
			http({
				method: 'POST',
				url: '/todos/list',
				data: body,
				transformResponse: [
					responseToJSON,
					(data: IReponseData<IApiList>) => ({ ...data, content: parseList(data.content) }),
				],
			})
				.then((res: IResponse<IList>) => {
					resolve(res.data.content);
				})
				.catch((err: PromiseRejectedResult) => {
					reject(err);
				});
		});
	},
	DELETE_LIST: (id: string): Promise<IListId> => {
		return new Promise((resolve, reject) => {
			http({
				method: 'DELETE',
				url: `/todos/list/${id}`,
				transformResponse: [
					responseToJSON,
					(data: IReponseData<IApiListId>) => ({ ...data, content: { id: data.content._id } }),
				],
			})
				.then((res: IResponse<IListId>) => {
					resolve(res.data.content);
				})
				.catch((err: PromiseRejectedResult) => {
					reject(err);
				});
		});
	},
};
