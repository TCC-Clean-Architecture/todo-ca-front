<template>
	<BaseModal :name="NEW_TASK_KEY" class="new-task-modal">
		<template #title>
			<h2 class="new-task-modal__title">Criar novo a fazer</h2>
		</template>
		<div class="new-task-modal__content">
			<p class="new-task-modal__description">
				Preencha os campos para criar um novo elemento na lista
			</p>
			<form class="new-task-modal__form" @submit.prevent>
				<div class="field">
					<label
						id="input-description-label"
						class="field__label"
						aria-label="input-description"
						for="input-description"
					>
						Descrição
					</label>
					<textarea
						class="field__textarea"
						v-model="form.description"
						aria-labelledby="input-description-label"
						name="input-description"
						id="input-description"
						rows="5"
					></textarea>
				</div>
				<div class="new-task-modal__actions">
					<BaseButton theme="secondary" pill>Criar</BaseButton>
					<BaseButton theme="gray" variant="text" pill @click="close()">Cancelar</BaseButton>
				</div>
			</form>
		</div>
	</BaseModal>
</template>

<script lang="ts" setup>
import BaseModal from '@/components/widgets/molecules/BaseModal.vue';
import BaseButton from '@/components/widgets/atoms/BaseButton.vue';

import { reactive } from 'vue';
import { useModals } from '@/plugins/core';
import { NEW_TASK_KEY } from '@/constants/modalKeys';

const modals = useModals();

/* -- Props -- */

interface IForm {
	description: string | undefined;
}

const form: IForm = reactive({
	description: undefined,
});

/* -- Methods -- */

const close = () => modals.hide(NEW_TASK_KEY);
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

.field {
	position: relative;

	display: flex;
	flex-direction: column;

	width: 100%;
	height: fit-content;

	&__label {
		position: relative;
		top: initial;
		left: initial;
		transform: unset;

		margin-block-end: 0.375rem;

		font-size: 0.75rem;
		font-weight: 500;
		color: $c-gray-40;

		border: none;
	}
	&__textarea {
		width: 100%;
		max-width: 100%;
		padding: 0.5rem 0.75rem 0.5rem;

		color: $c-gray-30;
		font-size: 0.875rem;
		font-family: 'DM Sans';

		background-color: var(--clr-bg-soft);
		border: 1px solid $c-gray-90;
		border-radius: 0.375rem;
		outline: none;
		resize: none;

		transition:
			background-color 200ms,
			border-color 300ms;
	}
}
</style>
