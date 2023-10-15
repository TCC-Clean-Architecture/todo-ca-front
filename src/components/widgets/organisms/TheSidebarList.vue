<template>
	<ul class="sidebar-lists">
		<li v-for="list in lists" :key="list.id">
			<button
				class="sidebar-lists__item"
				:class="{ 'sidebar-lists__item--active': isList(list.id) }"
				@click="useList(list.id)"
			>
				<BaseIcon theme="secondary" icon="list" :disabled="!isList(list.id)" />
				<span v-show="!layout.collapsed" v-text="list.name" />
				<BaseButton
					v-if="!layout.collapsed"
					class="sidebar-lists__trash"
					theme="secondary"
					variant="plain"
					icon="trash"
					:disabled="!isList(list.id)"
				/>
			</button>
		</li>
	</ul>
</template>

<script lang="ts" setup>
import BaseButton from '@/components/widgets/atoms/BaseButton.vue';
import BaseIcon from '@/components/widgets/atoms/BaseIcon.vue';

import { inject, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { LAYOUT_CONFIG_KEY } from '@/constants/injectionKeys';
import { useRoutesNames } from '@/plugins/core';
import { useListsStore } from '@/stores/lists';

/* -- Plugins -- */

const routesNames = useRoutesNames();
const router = useRouter();
const route = useRoute();
const listsStore = useListsStore();

/* -- Injects -- */

const layout = inject(LAYOUT_CONFIG_KEY)!;

/* -- Computeds -- */

const lists = computed(() => listsStore.lists);

/* -- Methods -- */

const isList = (id: string) => {
	return route.params.id === id;
};

const useList = (id: string) => {
	router.push({ name: routesNames.list, params: { id } });
};

onMounted(() => {
	listsStore.getLists();
});
</script>

<style lang="scss" scoped>
@use 'sass:math';

.sidebar-lists {
	$self: &;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	list-style: none;

	&__item {
		flex: 1;
		width: 100%;

		position: relative;

		display: flex;
		align-items: center;
		gap: 0.25rem;

		height: 2.25rem;
		padding-inline: 0.5rem;

		color: var(--clr-mute-darker);

		border-radius: 0.375rem;

		transition: all 150ms ease-in-out;

		&:hover {
			background-color: var(--clr-bg-soft-down);
		}

		&--active {
			color: var(--clr-primary);
			background-color: var(--clr-bg-soft-up);
		}

		span {
			font-size: 1rem;
			font-weight: 500;
			line-height: 1rem;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}

	&__trash {
		margin-inline-start: auto;
	}
}
</style>
