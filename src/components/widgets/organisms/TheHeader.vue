<template>
	<header class="header">
		<BaseBreadcumbs />
		<h1 class="header__title">Lista de Atividades</h1>
	</header>
</template>

<script lang="ts" setup>
import BaseBreadcumbs from '@/components/widgets/molecules/BaseBreadcumbs.vue';
</script>

<style lang="scss" scoped>
.header {
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
}
</style>
