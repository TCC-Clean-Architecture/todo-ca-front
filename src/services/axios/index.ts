import type { IResponse } from '@/interfaces';
import axios, { type AxiosInstance, type AxiosError } from 'axios';

class Http {
	public http: AxiosInstance;

	constructor() {
		this.http = axios.create({
			baseURL: `${import.meta.env.VITE_APP_BASE_URL}`,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				'Access-Control-Allow-Credentials': 'true',
				'Access-Control-Allow-Headers': 'Content-Type, X-Access-Token',
			},
		});

		this.defineInterceptor();
	}

	defineInterceptor() {
		this.http.interceptors.response.use(
			(response: IResponse) => response,
			(error: AxiosError) => error,
		);
	}
}

export default class SingletonHttp {
	static instance: AxiosInstance;

	constructor() {
		throw new Error('Use SingletonHttp.getInstance()');
	}

	static getInstance() {
		if (!this.instance) {
			const { http } = new Http();
			this.instance = http;

			const token = sessionStorage.getItem('token');
			if (token) this.defineToken(token);
		}
		return this.instance;
	}

	static defineToken(token: string) {
		this.instance.defaults.headers.common['X-Access-Token'] = token;
	}
}