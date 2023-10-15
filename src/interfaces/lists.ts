import type { ITodo, IApiTodo } from '@/interfaces';

export interface IList {
	id: string;
	name: string;
	todos: ITodo[];
	createdAt?: string;
}

export interface IApiList extends Omit<IList, 'id' | 'todos'> {
	_id: string;
	todos: IApiTodo[];
}

export type IApiListId = Pick<IApiList, '_id'>;

export type IListId = Pick<IList, 'id'>;

export type IListBasic = Pick<IList, 'name'>;
