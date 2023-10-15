export interface IStatusObject {
	id: string;
	name: string;
}

export const taskStatus: Record<string, IStatusObject> = {
	todo: { id: 'todo', name: 'A fazer' },
	done: { id: 'done', name: 'Pronto' },
	inprogress: { id: 'inprogress', name: 'Em progresso' },
};
