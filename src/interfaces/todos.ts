export interface ITodo {
	id: string;
	name: string;
	description: string;
	status: string;
	createdAt?: string;
}

export interface IApiTodo extends Omit<ITodo, 'id'> {
	_id: string;
}

export type IApiTodoId = Pick<IApiTodo, '_id'>;

export type ITodoId = Pick<ITodo, 'id'>;

export type ITodoBasic = Omit<ITodo, 'id' | 'createdAt'>;

export interface ITodoParamsIDs {
	listId: string;
	todoId: string;
}
