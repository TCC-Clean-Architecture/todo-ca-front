<template>
	<BaseModal :name="NEW_TASK_KEY" class="new-task-modal" @close="resetData()">
		<template #title>
			<h2 class="new-task-modal__title">Criar novo a fazer</h2>
		</template>
		<div class="new-task-modal__content">
			<p class="new-task-modal__description">
				Preencha os campos para criar um novo elemento na lista
			</p>
			<form class="new-task-modal__form" @submit.prevent>
				<InputField v-model="form.title" variant="outline" name="input-title" label="Título" />
				<TextareaField
					v-model="form.description"
					variant="outline"
					label="Descrição"
					name="input-description"
				/>
				<MultiselectField
					v-model="form.status"
					:options="statusList"
					name="input-status"
					label="Status"
				/>
				<div class="new-task-modal__actions">
					<BaseButton theme="secondary" pill @click="createTodo">Criar</BaseButton>
					<BaseButton theme="gray" variant="text" pill @click="close()">Cancelar</BaseButton>
				</div>
			</form>
		</div>
	</BaseModal>
</template>

<script lang="ts" setup>
import BaseModal from '@/components/widgets/molecules/BaseModal.vue';
import BaseButton from '@/components/widgets/atoms/BaseButton.vue';
import InputField from '@/components/widgets/molecules/InputField.vue';
import TextareaField from '@/components/widgets/molecules/TextareaField.vue';
import MultiselectField from '@/components/widgets/molecules/MultiselectField.vue';

import { reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useModals } from '@/plugins/core';
import { NEW_TASK_KEY } from '@/constants/modalKeys';
import { taskStatus } from '@/constants/taskStatus';
import { useTodosStore } from '@/stores/todos';

/* -- Plugins -- */

const todosStore = useTodosStore();
const route = useRoute();
const modals = useModals();

/* -- Data -- */

interface IMultiselectModel {
	value: string;
	text: string;
}

interface IForm {
	title?: string;
	description?: string;
	status?: IMultiselectModel;
}

const form: IForm = reactive({
	title: undefined,
	description: undefined,
	status: undefined,
});

const statusList = Object.values(taskStatus).map((status) => ({
	value: status.id,
	text: status.name,
}));

/* -- Computed -- */

const listId = computed(() => {
	return route.params.id as string;
});

/* -- Methods -- */

const close = () => modals.hide(NEW_TASK_KEY);

const resetData = () => {
	form.title = undefined;
	form.description = undefined;
	form.status = undefined;
};

const createTodo = () => {
	if (!(form.title && form.description && form.status)) return;
	const requestBody = {
		name: form.title,
		description: form.description,
		status: form.status.value,
	};
	todosStore.addTodo(listId.value, requestBody).then(() => {
		close();
	});
};
</script>

<style lang="scss" scoped>
.new-task-modal {
	$self: &;
	&__title {
		margin-block-start: 1rem;
		color: var(--clr-primary);
	}
	&__content {
		display: flex;
		flex-direction: column;

		padding-inline: 2rem;

		#{$self}__description {
			margin-block-end: 1rem;
			color: var(--clr-primary-lighter);
		}

		#{$self}__form {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
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
@/constants/taskStatus
