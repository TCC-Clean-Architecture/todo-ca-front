<template>
	<BaseModal :name="DELETE_LIST_KEY" class="remove-list-modal" width="420px">
		<div class="remove-list-modal__content">
			<h2 class="remove-list-modal__title">Remover lista</h2>
			<p class="remove-list-modal__description">Você tem certeza que deseja excluir a lista?</p>
			<p class="remove-list-modal__description">
				Caso escolha essa opção, sua lista será excluída e você perderá todas tarefas.
			</p>
		</div>

		<template #footer>
			<div class="remove-list-modal__actions">
				<BaseButton theme="danger" pill @click="deleteList()">Excluir</BaseButton>
				<BaseButton theme="gray" variant="text" pill @click="close()">Cancelar</BaseButton>
			</div>
		</template>
	</BaseModal>
</template>

<script lang="ts" setup>
import BaseModal from '@/components/widgets/molecules/BaseModal.vue';
import BaseButton from '@/components/widgets/atoms/BaseButton.vue';

import { useModals } from '@/plugins/core';
import { DELETE_LIST_KEY } from '@/constants/modalKeys';
import { useListsStore } from '@/stores/lists';

/* -- Plugins -- */

const listsStore = useListsStore();
const modals = useModals();

/* -- Props -- */

interface IProps {
	id: string;
}

const props = defineProps<IProps>();

/* -- Methods -- */

const close = () => modals.hide(DELETE_LIST_KEY);

const deleteList = () => {
	if (!props.id) return;
	listsStore.deleteList(props.id).then(() => close());
};
</script>

<style lang="scss" scoped>
.remove-list-modal {
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

	&__delete {
		height: 40px;
		min-width: 140px;
		padding-inline: 1.5rem;

		color: var(--clr-text-inverse-1);
		font-weight: 600;

		background-color: var(--clr-danger);
		border-radius: 100vw;

		transition: background-color 200ms ease-in-out;

		&:hover {
			background-color: var(--clr-danger-dark);
		}
	}

	&__cancel {
		height: 40px;
		min-width: 140px;
		padding-inline: 1.5rem;

		color: var(--clr-text-1);
		font-weight: 600;

		border-radius: 100vw;

		transition: background-color 200ms ease-in-out;

		&:hover {
			background-color: var(--clr-gray-lightest);
		}
	}
}
</style>
@/stores/lists
