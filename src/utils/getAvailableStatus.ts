import { taskStatus } from '@/constants/taskStatus';

const getAvailableStatus = (name: string) => {
	const defaultTask = {
		id: 'unknown',
		name: 'Desconhecido',
	};
	return taskStatus[name] || defaultTask;
};

export default getAvailableStatus;
