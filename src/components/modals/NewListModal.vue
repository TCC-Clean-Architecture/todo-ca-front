<template>
	<BaseModal :name="NEW_LIST_KEY" class="new-list-modal" @close="resetData()">
		<template #title>
			<h2 class="new-list-modal__title">Criar nova lista</h2>
		</template>
		<div class="new-list-modal__content">
			<p class="new-list-modal__description">Defina um nome para lista que será criada</p>
			<form class="new-list-modal__form" @submit.prevent>
				<InputField v-model="form.name" variant="outline" name="input-name" label="Nome" />
				<div class="new-list-modal__actions">
					<BaseButton theme="secondary" pill @click="createList()">Criar</BaseButton>
					<BaseButton theme="gray" variant="text" pill @click="close()">Cancelar</BaseButton>
				</div>
			</form>
		</div>
	</BaseModal>
</template>

<script lang="ts" setup>
import BaseModal from '@/components/widgets/molecules/BaseModal.vue';
import InputField from '@/components/widgets/molecules/InputField.vue';
import BaseButton from '@/components/widgets/atoms/BaseButton.vue';

import { reactive } from 'vue';
import { useModals } from '@/plugins/core';
import { NEW_LIST_KEY } from '@/constants/modalKeys';
import { useListsStore } from '@/stores/lists';

/* -- Plugins -- */

const listsStore = useListsStore();
const modals = useModals();

/* -- Data -- */

interface IForm {
	name: string | undefined;
}

const form: IForm = reactive({
	name: undefined,
});

/* -- Methods -- */

const close = () => modals.hide(NEW_LIST_KEY);

const resetData = () => {
	form.name = undefined;
};

const createList = () => {
	if (!form.name) return;
	const body = {
		name: form.name,
	};
	listsStore.addList(body).then(() => close());
};
</script>

<style lang="scss" scoped>
.new-list-modal {
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
