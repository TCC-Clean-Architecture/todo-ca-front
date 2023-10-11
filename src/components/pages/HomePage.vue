<template>
	<DashboardLayout>
		<template #sidebar>
			<TheSidebar />
		</template>
		<TheHeader />
		<TheList />
	</DashboardLayout>
</template>

<script lang="ts" setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import TheHeader from '@/components/widgets/organisms/TheHeader.vue';
import TheSidebar from '@/components/widgets/organisms/TheSidebar.vue';
import TheList from '@/components/widgets/organisms/TheList.vue';
</script>

<style lang="scss" scoped></style>
