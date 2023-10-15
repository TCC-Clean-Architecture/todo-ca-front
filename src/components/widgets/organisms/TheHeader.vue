<template>
	<header class="header">
		<BaseBreadcumbs />
		<div class="header__title">
			<h1 class="header__h1" v-text="listName" />
			<BaseButton
				icon="trash"
				size="sm"
				theme="secondary"
				variant="flat"
				@click="openRemoveListModal()"
			/>
		</div>
	</header>
	<RemoveListModal v-if="listId" :id="listId" />
</template>

<script lang="ts" setup>
import BaseBreadcumbs from '@/components/widgets/molecules/BaseBreadcumbs.vue';
import BaseButton from '@/components/widgets/atoms/BaseButton.vue';
import RemoveListModal from '@/components/modals/RemoveListModal.vue';

import { computed, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useModals } from '@/plugins/core';
import { DELETE_LIST_KEY } from '@/constants/modalKeys';
import { useListsStore } from '@/stores/lists';

/* -- Plugins -- */

const modals = useModals();
const listsStore = useListsStore();
const route = useRoute();

/* -- Computeds -- */

const listId = computed(() => {
	return route.params.id as string;
});

const listName = computed(() => listsStore.listName);

/* -- Methods -- */

const openRemoveListModal = () => {
	nextTick(() => modals.show(DELETE_LIST_KEY));
};
</script>

<style lang="scss" scoped>
.header {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	margin: 1.5rem;

	&__title {
		display: flex;
		align-items: center;
		justify-content: space-between;

		padding-block: 0.25rem;
		padding-inline: 1rem;

		background-color: var(--clr-bg-soft);
		border-radius: 0.5rem;
	}

	&__h1 {
		min-height: 2.625rem;

		color: var(--clr-primary);
		font-size: 2rem;
		font-weight: 700;
	}
}
</style>
