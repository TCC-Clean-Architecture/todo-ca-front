<template>
	<div
		class="layout-dashboard"
		:style="{ 'grid-template-columns': `${collapsed ? '4rem' : '14rem'} minmax(0, 1fr)` }"
	>
		<aside class="layout-dashboard__sidebar">
			<slot name="sidebar" v-bind="provideOptions" />
		</aside>
		<main class="layout-dashboard__content">
			<slot v-bind="provideOptions" />
		</main>
	</div>
</template>

<script lang="ts" setup>
import { provide, readonly } from 'vue';
import { useToggle, useSessionStorage } from '@vueuse/core';
import { LAYOUT_CONFIG_KEY } from '@/constants/injectionKeys';

const collapsed = useSessionStorage('sidebar-collapse', false);
const toggleCollapse = useToggle(collapsed);

const provideOptions = { collapsed: readonly(collapsed), toggleCollapse };

provide(LAYOUT_CONFIG_KEY, provideOptions);
</script>

<style lang="scss" scoped>
.layout-dashboard {
	$layout-gap: 0.625rem;

	position: relative;

	display: grid;
	gap: $layout-gap;

	transition: all 300ms ease-in-out;

	&__sidebar {
		position: sticky;
		height: 100vh;

		z-index: 10;
	}
}
</style>
