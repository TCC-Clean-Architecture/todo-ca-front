import type { IApiList, IList } from '@/interfaces';

export const parseLists = (lists: IApiList[]): IList[] => {
	return lists.map((list) => parseList(list));
};

export const parseList = (todo: IApiList): IList => {
	return {
		id: todo._id,
		name: todo.name,
		todos: todo.todos,
		createdAt: todo.createdAt,
	};
};
