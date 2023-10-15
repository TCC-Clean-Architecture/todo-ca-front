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
import { reactiveComputed, useToggle, useSessionStorage } from '@vueuse/core';
import { LAYOUT_CONFIG_KEY } from '@/constants/injectionKeys';

const collapsed = useSessionStorage('sidebar-collapse', false);
const toggleCollapse = useToggle(collapsed);

const provideOptions = reactiveComputed(() => ({
	collapsed: readonly(collapsed).value,
	toggleCollapse,
}));

provide(LAYOUT_CONFIG_KEY, provideOptions);
</script>

<style lang="scss" scoped>
.layout-dashboard {
	position: relative;

	display: grid;

	transition: all 300ms ease-in-out;

	&__sidebar {
		position: sticky;
		top: 0;
		z-index: 10;

		height: 100vh;
	}
}
</style>
