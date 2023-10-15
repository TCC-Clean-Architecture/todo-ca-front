<template>
	<BaseModal :name="DELETE_TASK_KEY" class="remove-task-modal" width="420px">
		<div class="remove-task-modal__content">
			<h2 class="remove-task-modal__title">Remover tarefa</h2>
			<p class="remove-task-modal__description">Você tem certeza que deseja excluir a tarefa?</p>
			<p class="remove-task-modal__description">
				Caso escolha essa opção, sua tarefa será excluída e você perderá as informações.
			</p>
		</div>

		<template #footer>
			<div class="remove-task-modal__actions">
				<BaseButton theme="danger" pill @click="deleteTodo()">Excluir</BaseButton>
				<BaseButton theme="gray" variant="text" pill @click="close()">Cancelar</BaseButton>
			</div>
		</template>
	</BaseModal>
</template>

<script lang="ts" setup>
import BaseModal from '@/components/widgets/molecules/BaseModal.vue';
import BaseButton from '@/components/widgets/atoms/BaseButton.vue';

import { useModals } from '@/plugins/core';
import { DELETE_TASK_KEY } from '@/constants/modalKeys';
import { useTodosStore } from '@/stores/todos';

/* -- Plugins -- */

const todosStore = useTodosStore();
const modals = useModals();

/* -- Props -- */

interface IProps {
	id: string;
}

const props = defineProps<IProps>();

/* -- Methods -- */

const close = () => modals.hide(DELETE_TASK_KEY);

const deleteTodo = () => {
	todosStore.deleteTodo(props.id).then(() => {
		close();
	});
};
</script>

<style lang="scss" scoped>
.remove-task-modal {
	$self: &;
	&__title {
		margin-block: 1rem;
		text-align: center;
		color: var(--clr-primary);
	}

	&__content {
		display: flex;
		flex-direction: column;

		padding-inline: 2rem;

		#{$self}__description {
			margin-block-end: 1rem;

			color: var(--clr-primary-lighter);
			text-align: center;
		}
	}

	&__actions {
		display: flex;
		justify-content: center;
		gap: 0.5rem;

		padding-block: 2rem;
	}
}
</style>
