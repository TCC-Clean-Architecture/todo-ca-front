<template>
	<DashboardLayout>
		<template #sidebar>
			<TheSidebar />
		</template>
		<slot></slot>
	</DashboardLayout>
</template>

<script lang="ts" setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import TheSidebar from '@/components/widgets/organisms/TheSidebar.vue';
</script>

<style lang="scss" scoped></style>
