<template>
	<nav class="breadcrumbs" role="navigation" aria-label="breadcrumbs">
		<ol class="breadcrumbs__list">
			<li class="breadcrumbs__item">Page</li>
			<li class="breadcrumbs__divider">/</li>
			<div class="breadcrumbs__item">{{ routesNames.lists }}</div>
			<div class="breadcrumbs__divider" v-if="listId">/</div>
			<li class="breadcrumbs__item" v-if="listId">
				<RouterLink :to="{ name: routesNames.list, params: { id: listId } }" aria-current="page">
					{{ listId }}
				</RouterLink>
			</li>
		</ol>
	</nav>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRoutesNames } from '@/plugins/core';

/* -- Plugins -- */

const route = useRoute();
const routesNames = useRoutesNames();

/* -- computed -- */

const listId = computed(() => {
	return route.params.id as string;
});
</script>

<style lang="scss" scoped>
.breadcrumbs {
	$self: &;
	position: relative;

	&__list {
		display: flex;
		align-items: center;
		gap: 0.25rem;

		list-style: none;
	}

	&__divider {
		color: var(--clr-primary-light);
	}

	&__item,
	&__item > a {
		color: var(--clr-primary-light);
		font-size: 0.875rem;
		font-weight: 500;
	}

	&__item:hover > a {
		text-decoration: underline;
	}
}
</style>
