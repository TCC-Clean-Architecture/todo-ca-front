import type { IApiList, IList } from '@/interfaces';
import { parseTodos } from '@/utils/parseTodo';

export const parseLists = (lists: IApiList[]): IList[] => {
	return lists.map((list) => parseList(list));
};

export const parseList = (list: IApiList): IList => {
	return {
		id: list._id,
		name: list.name,
		todos: parseTodos(list.todos),
		createdAt: list.createdAt,
	};
};
