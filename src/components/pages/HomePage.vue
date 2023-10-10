<template>
	<DashboardLayout>
		<div class="header">
			<h1 class="header__title">Dashboard</h1>
		</div>
		<section class="dashboard"></section>
		<template #sidebar>
			<TheSidebar />
		</template>
	</DashboardLayout>
</template>

<script lang="ts" setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import TheSidebar from '@/components/widgets/organisms/TheSidebar.vue';
</script>

<style lang="scss" scoped>
.header {
	&__title {
		color: var(--clr-dark);
	}
}

.dashboard {
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 2rem;

	background-color: var(--clr-bg-elv-down);
	border-radius: 0.25rem;
}
</style>
