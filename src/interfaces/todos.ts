export interface ITodo {
	id: string;
	name: string;
	description: string;
	status: string;
	createdAt?: string;
}

export type ITodoId = Pick<ITodo, 'id'>;

export type ITodoBasic = Omit<ITodo, 'id' | 'createdAt'>;
