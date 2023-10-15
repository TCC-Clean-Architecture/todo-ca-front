import type { AxiosResponse } from 'axios';

export type RequestsStatus = 'loading' | 'success' | 'error';

export interface IReponseData<T> {
	content: T;
	description: string;
	message: string;
	statusCode: number;
	type: string;
}

export interface IResponse<T = any> extends AxiosResponse<IReponseData<T>> {}
