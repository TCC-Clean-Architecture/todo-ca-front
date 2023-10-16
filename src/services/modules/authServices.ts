import Http from '@/services/axios';
import type {
	IResponse,
	IReponseData,
	IAuthRequestPayload,
	IApiUser,
	IUser,
	IUserBasic,
	IRegisterUserPayload,
	IApiUserBasic,
} from '@/interfaces';
import { parseUser } from '@/utils/parseUser';
import { responseToJSON } from '@/utils/responseToJSON';

const http = Http.getInstance();

export const authServices = {
	AUTH_REQUEST: (body: IAuthRequestPayload): Promise<IUser> => {
		return new Promise((resolve, reject) => {
			http({
				method: 'POST',
				url: '/authenticate',
				data: body,
				transformResponse: [
					responseToJSON,
					(data: IReponseData<IApiUser>) => ({ ...data, content: parseUser(data.content) }),
				],
			})
				.then((res: IResponse<IUser>) => {
					Http.defineToken(res.data.content.token);
					resolve(res.data.content);
				})
				.catch((err: PromiseRejectedResult) => {
					reject(err);
				});
		});
	},
	REGISTER_USER: (body: IRegisterUserPayload): Promise<IUserBasic> => {
		return new Promise((resolve, reject) => {
			http({
				method: 'POST',
				url: '/users/register',
				data: body,
				transformResponse: [
					responseToJSON,
					(data: IReponseData<IApiUserBasic>) => ({ ...data, content: parseUser(data.content) }),
				],
			})
				.then((res: IResponse<IUserBasic>) => {
					resolve(res.data.content);
				})
				.catch((err: PromiseRejectedResult) => {
					reject(err);
				});
		});
	},
};
