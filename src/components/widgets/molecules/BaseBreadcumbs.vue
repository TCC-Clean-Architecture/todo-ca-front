<template>
	<nav class="breadcrumbs" role="navigation" aria-label="breadcrumbs">
		<ol class="breadcrumbs__list">
			<li class="breadcrumbs__item">Page</li>
			<li class="breadcrumbs__divider">/</li>
			<li class="breadcrumbs__item">
				<RouterLink :to="{ name: routesNames.home }" aria-current="page">Dashboard</RouterLink>
			</li>
		</ol>
	</nav>
</template>

<script lang="ts" setup>
import { useRoutesNames } from '@/plugins/core';
/* -- Plugins -- */

const routesNames = useRoutesNames();
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
