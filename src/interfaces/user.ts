export interface IUser {
	id: string;
	name: string;
	email: string;
	token: string;
}

export interface IApiUser extends Omit<IUser, 'id'> {
	_id: string;
}

export type IUserBasic = Omit<IUser, 'token'>;

export type IApiUserBasic = Omit<IApiUser, 'token'>;

export interface IAuthRequestPayload {
	email: string;
	password: string;
}

export interface IRegisterUserPayload {
	name: string;
	email: string;
	password: string;
}
