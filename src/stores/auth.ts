import Http from '@/utils/axios';
import type { AxiosError, AxiosResponse } from 'axios';
import { useSessionStorage, type RemovableRef } from '@vueuse/core';
import { defineStore } from 'pinia';

const http = Http.getInstance();

interface IUser {
	_id: string;
	name: string;
	email: string;
	token: string;
}

interface IReponseMessage<T> {
	content: T;
	description: string;
	message: string;
	statusCode: number;
	type: string;
}

interface IListsStoreState {
	token: RemovableRef<string | null>;
}

interface IAuthRequestPayload {
	email: string;
	password: string;
}

interface IRegisterUserPayload {
	name: string;
	email: string;
	password: string;
}

export const useAuthStore = defineStore('auth', {
	state: (): IListsStoreState => ({
		token: useSessionStorage<string | null>('token', null),
	}),
	getters: {
		isAutenticated: (state) => !!state.token,
	},
	actions: {
		AUTH_REQUEST(body: IAuthRequestPayload): Promise<IUser> {
			return new Promise((resolve, reject) => {
				http({
					method: 'POST',
					url: '/authenticate',
					data: body,
				})
					.then((response: AxiosResponse<IReponseMessage<IUser>>) => {
						const { content } = response.data;
						this.token = content.token;
						Http.defineToken(content.token);
						resolve(content);
					})
					.catch((error: AxiosError) => {
						this.token = null;
						reject(error);
					});
			});
		},
		REGISTER_USER(body: IRegisterUserPayload): Promise<void> {
			return new Promise((resolve, reject) => {
				http({
					method: 'POST',
					url: '/users/register',
					data: body,
				})
					.then((response: AxiosResponse<IReponseMessage<any>>) => {
						resolve(response.data.content);
					})
					.catch((error: AxiosError) => {
						reject(error);
					});
			});
		},
		AUTH_LOGOUT() {
			this.$reset();
		},
	},
});
