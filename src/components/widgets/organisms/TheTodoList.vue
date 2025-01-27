<template>
	<section class="list">
		<Draggable
			tag="ol"
			class="list__wrapper"
			handle=".todo-item__handle"
			v-model="todos"
			group="tasks"
			item-key="id"
			:animation="200"
		>
			<template #item="{ element }">
				<li class="list__item">
					<TodoItem v-bind="element" @edit="openEditTaskModal" @remove="openRemoveTaskModal" />
				</li>
			</template>
			<template #footer>
				<BaseButton
					icon="plus"
					size="lg"
					theme="secondary"
					variant="flat"
					block
					@click="openNewTaskModal()"
				/>
			</template>
		</Draggable>
	</section>
	<NewTaskModal />
	<EditTaskModal v-if="itemId" :id="itemId" />
	<RemoveTaskModal v-if="itemId" :id="itemId" />
</template>

<script lang="ts" setup>
import TodoItem from '@/components/widgets/molecules/TodoItem.vue';
import BaseButton from '@/components/widgets/atoms/BaseButton.vue';
import NewTaskModal from '@/components/modals/NewTaskModal.vue';
import EditTaskModal from '@/components/modals/EditTaskModal.vue';
import RemoveTaskModal from '@/components/modals/RemoveTaskModal.vue';
import Draggable from 'vuedraggable';

import { ref, computed, onMounted, nextTick } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { useModals } from '@/plugins/core';
import { useListsStore } from '@/stores/lists';
import { useTodosStore } from '@/stores/todos';
import { NEW_TASK_KEY, EDIT_TASK_KEY, DELETE_TASK_KEY } from '@/constants/modalKeys';

/* -- Plugins -- */

const route = useRoute();
const modals = useModals();
const listsStore = useListsStore();
const todosStore = useTodosStore();

/* -- Data -- */

const itemId = ref<string>();

/* -- Computed -- */

const listId = computed(() => {
	return route.params.id as string;
});

const todos = computed(() => todosStore.todos);

/* -- Methods -- */

const openNewTaskModal = () => modals.show(NEW_TASK_KEY);

const openEditTaskModal = (id: string) => {
	itemId.value = id;
	nextTick(() => modals.show(EDIT_TASK_KEY));
};

const openRemoveTaskModal = (id: string) => {
	itemId.value = id;
	nextTick(() => modals.show(DELETE_TASK_KEY));
};

/* -- Lifecycle -- */

onBeforeRouteUpdate((to, from) => {
	if (to.params.id !== from.params.id) {
		listsStore.getList(to.params.id as string);
	}
});

onMounted(() => {
	listsStore.getList(listId.value);
});
</script>

<style lang="scss" scoped>
.list {
	$self: &;
	display: flex;
	flex-direction: column;
	gap: 1rem;

	margin: 1.5rem;

	&__title {
		display: block;

		padding-block: 0.25rem;
		padding-inline: 1rem;

		color: var(--clr-primary);
		font-size: 2rem;
		font-weight: 700;

		background-color: var(--clr-bg-soft);
		border-radius: 0.5rem;
	}

	&__wrapper {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;

		background-color: var(--clr-bg-soft);
		border-radius: 0.5rem;
		padding: 1.75rem;

		list-style: none;
	}
}
</style>
