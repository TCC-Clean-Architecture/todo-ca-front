<template>
	<div class="sidebar-misc">
		<span class="sidebar-misc__user" :title="authStore.username" v-text="userLetter" />
		<SwitchColorTheme v-if="!layout.collapsed" />
		<BaseButton
			v-if="!layout.collapsed"
			class="sidebar-misc__logout"
			icon="sign-out"
			theme="secondary"
			variant="flat"
			pill
			@click="doLogout()"
		/>
	</div>
</template>

<script lang="ts" setup>
import SwitchColorTheme from '@/components/widgets/atoms/SwitchColorTheme.vue';
import BaseButton from '@/components/widgets/atoms/BaseButton.vue';

import { inject, computed } from 'vue';
import { useRouter } from 'vue-router';
import { LAYOUT_CONFIG_KEY } from '@/constants/injectionKeys';
import { useRoutesNames } from '@/plugins/routesNames';
import { useAuthStore } from '@/stores/auth';

/* -- Plugins -- */

const router = useRouter();
const routesNames = useRoutesNames();
const authStore = useAuthStore();

/* -- Injects -- */

const layout = inject(LAYOUT_CONFIG_KEY)!;

/* -- Computed -- */

const userLetter = computed(() => {
	if (authStore.username) return authStore.username[0];
	return '?';
});

/* -- Methods -- */

const doLogout = () => {
	authStore.doLogout();
	router.push({ name: routesNames.login });
};
</script>

<style lang="scss" scoped>
@use 'sass:math';

.sidebar-misc {
	$self: &;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 0.5rem;

	margin-block-start: auto;
	margin-inline: 1rem;
	padding: 0.5rem;

	background-color: var(--clr-bg-soft);
	box-shadow: $elevation-2;
	border-radius: 100vw;
	overflow: hidden;

	& > * {
		flex: 0 0 auto;
	}

	&__user {
		display: grid;
		place-items: center;

		width: 2.5rem;
		height: 2.5rem;

		color: var(--clr-secondary-contrast);
		background-color: var(--clr-secondary);
		border-radius: 100vw;

		font-size: 1.25rem;
		font-weight: bolder;
		user-select: none;
	}
}
</style>
