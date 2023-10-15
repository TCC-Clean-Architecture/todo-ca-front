import type { ITodo } from '@/interfaces';

export interface IList {
	id: string;
	name: string;
	todos: ITodo[];
	createdAt: string;
}

export interface IApiList extends Omit<IList, 'id'> {
	_id: string;
}

export type IApiListId = Pick<IApiList, '_id'>;

export type IListId = Pick<IList, 'id'>;

export type IListBasic = Pick<IList, 'name'>;
