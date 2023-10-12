import type { EventBusKey } from '@vueuse/core';

export const NEW_EDIT_TASK_KEY: EventBusKey<{ event: 'hide' | 'show'; props?: unknown }> =
	Symbol('modal-new-edit-task');
