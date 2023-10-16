import type { IAuthRequestPayload, IRegisterUserPayload, IUser, IUserBasic } from '@/interfaces';
import { StorageSerializers, useSessionStorage, type RemovableRef } from '@vueuse/core';
import { authServices } from '@/services';
import { defineStore } from 'pinia';

interface IListsStoreState {
	token: RemovableRef<string | null>;
	user: RemovableRef<IUserBasic | null>;
}

export const useAuthStore = defineStore('auth', {
	state: (): IListsStoreState => ({
		token: useSessionStorage<string | null>('token', null),
		user: useSessionStorage<IUserBasic | null>('user', null, {
			serializer: StorageSerializers.object,
		}),
	}),
	getters: {
		isAutenticated: (state) => !!state.token,
		username: (state) => state.user?.name,
		userEmail: (state) => state.user?.email,
	},
	actions: {
		doLogin(body: IAuthRequestPayload): Promise<IUser> {
			return new Promise((resolve, reject) => {
				authServices
					.AUTH_REQUEST(body)
					.then((user) => {
						this.token = user.token;
						this.user = user;
						resolve(user);
					})
					.catch((err) => {
						this.doLogout();
						reject(err);
					});
			});
		},
		registerUser(body: IRegisterUserPayload): Promise<IUserBasic> {
			return new Promise((resolve, reject) => {
				authServices
					.REGISTER_USER(body)
					.then((user) => {
						resolve(user);
					})
					.catch((err) => {
						this.doLogout();
						reject(err);
					});
			});
		},
		doLogout() {
			this.$reset();
			this.token = null;
			this.user = null;
		},
	},
});
