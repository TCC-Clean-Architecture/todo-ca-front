import type { IList, IListBasic, IListId } from '@/interfaces';
import { listsServices } from '@/services';
import { defineStore } from 'pinia';

interface IListsStoreState {
	lists: IList[];
	list: IList | null;
}

export const useListsStore = defineStore('lists', {
	state: (): IListsStoreState => ({
		lists: [],
		list: null,
	}),
	getters: {
		listTodos: (state) => state.list?.todos ?? [],
		listName: (state) => state.list?.name,
	},
	actions: {
		getLists(): Promise<IList[]> {
			return new Promise((resolve, reject) => {
				listsServices
					.GET_LISTS()
					.then((lists) => {
						this.lists = lists;
						resolve(lists);
					})
					.catch((err) => reject(err));
			});
		},
		getList(id: string): Promise<IList> {
			return new Promise((resolve, reject) => {
				listsServices
					.GET_LIST(id)
					.then((list) => {
						this.list = { name: '', id, todos: list };
						resolve({ name: '', id, todos: list });
					})
					.catch((err) => reject(err));
			});
		},
		addList(body: IListBasic): Promise<IList> {
			return new Promise((resolve, reject) => {
				listsServices
					.CREATE_LIST(body)
					.then((list) => {
						this.lists.push(list);
						resolve(list);
					})
					.catch((err) => reject(err));
			});
		},
		deleteList(id: string): Promise<IListId> {
			return new Promise((resolve, reject) => {
				listsServices
					.DELETE_LIST(id)
					.then((deleted) => {
						this.lists = this.lists.filter((l) => l.id !== deleted.id);
						resolve(deleted);
					})
					.catch((err) => reject(err));
			});
		},
	},
});
