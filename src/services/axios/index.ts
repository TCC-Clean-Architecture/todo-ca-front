import type { IResponse } from '@/interfaces';
import axios, { type AxiosInstance, type AxiosError } from 'axios';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

class Http {
	public http: AxiosInstance;

	constructor() {
		this.http = axios.create({
			baseURL: `${import.meta.env.VITE_APP_BASE_URL}`,
			headers: {
				'Access-Control-Allow-Origin': 'http://127.0.0.1:3000',
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
			(error: AxiosError) => {
				const authStore = useAuthStore();
				const router = useRouter();

				if (error.request.status === 401) {
					if (authStore.isAutenticated) {
						authStore.doLogout();
						router.push({ name: 'Login' });
					}
				}
				return error;
			},
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
