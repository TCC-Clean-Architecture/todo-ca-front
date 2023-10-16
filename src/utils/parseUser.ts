import type { IApiUser, IApiUserBasic, IUser, IUserBasic } from '@/interfaces';

export const parseUser = (user: IApiUser | IApiUserBasic): IUser | IUserBasic => {
	if (!('token' in user)) {
		return {
			id: user._id,
			name: user.name,
			email: user.email,
		};
	}
	return {
		id: user._id,
		name: user.name,
		email: user.email,
		token: user.token,
	};
};
