<template>
	<div class="sidebar" :class="{ 'sidebar--collapsed': layout.collapsed }">
		<button class="sidebar__button-collapse" @click="onCollapseMenu()">
			<IconAngles />
		</button>
		<div class="sidebar__wrapper">
			<i class="sidebar__logo">
				<LogoCollapsed2DO4U v-if="layout.collapsed" />
				<Logo2DO4U v-else />
			</i>
			<BaseDivider theme="primary" />
		</div>
		<section class="sidebar__lists">
			<BaseButton
				class="sidebar__create-list"
				theme="secondary"
				prepend-icon="plus"
				block
				@click="openNewListModal()"
			>
				<span v-if="!layout.collapsed">Lista</span>
			</BaseButton>
			<TheSidebarList />
		</section>
		<TheSidebarMisc class="sidebar__misc" />
	</div>
	<NewListModal />
</template>

<script lang="ts" setup>
import Logo2DO4U from '@/components/icons/Logo2DO4U.vue';
import LogoCollapsed2DO4U from '@/components/icons/LogoCollapsed2DO4U.vue';
import IconAngles from '@/components/icons/IconAngles.vue';
import BaseDivider from '@/components/widgets/atoms/BaseDivider.vue';
import BaseButton from '@/components/widgets/atoms/BaseButton.vue';
import TheSidebarList from '@/components/widgets/organisms/TheSidebarList.vue';
import TheSidebarMisc from '@/components/widgets/organisms/TheSidebarMisc.vue';
import NewListModal from '@/components/modals/NewListModal.vue';

import { inject } from 'vue';
import { useModals } from '@/plugins/core';
import { LAYOUT_CONFIG_KEY } from '@/constants/injectionKeys';
import { NEW_LIST_KEY } from '@/constants/modalKeys';

/* -- Plugins -- */

const modals = useModals();

/* -- Injects -- */

const layout = inject(LAYOUT_CONFIG_KEY)!;

/* -- Methods -- */

const openNewListModal = () => modals.show(NEW_LIST_KEY);

const onCollapseMenu = () => {
	layout.toggleCollapse();
};
</script>

<style lang="scss" scoped>
@use 'sass:math';

.sidebar {
	$self: &;
	position: relative;

	display: flex;
	flex-direction: column;

	height: 100%;
	padding-block: 1.5rem;

	background-color: var(--clr-bg-soft);

	border-radius: 0.25rem;

	&:hover {
		#{$self}__button-collapse {
			visibility: visible;
			opacity: 1;
		}
	}

	&--collapsed {
		padding-block: 1rem;

		#{$self}__wrapper {
			margin-inline: 0.5rem;
		}

		#{$self}__logo {
			margin-inline: 0rem;
		}

		#{$self}__lists {
			margin-inline: 0.75rem;
		}

		#{$self}__button-collapse > svg {
			rotate: 180deg;
		}

		#{$self}__misc {
			margin-inline: 0.5rem;
			justify-content: center;
			padding: 0rem;
			box-shadow: none;
		}
	}

	&__wrapper {
		display: flex;
		flex-direction: column;
		margin-inline: 1rem;
	}

	&__logo {
		max-width: 100%;
		height: 2rem;
		margin-block: 1rem;
		margin-inline: 1.5rem;

		& > svg {
			max-width: inherit;
			height: inherit;
		}
	}

	&__lists {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		margin-block: 1rem;
		margin-inline: 1rem;
	}

	&__create-list {
		padding-inline: 0;
		font-weight: 600;
	}

	&__button-collapse {
		$button-size: 2rem;
		$half-size: math.div($button-size, 2);
		position: absolute;

		right: -$half-size;
		top: 2.5rem;

		display: grid;
		place-items: center;

		border-radius: 100vw;

		height: $button-size;
		width: $button-size;

		background-color: var(--clr-bg-soft-up);
		box-shadow: $elevation-1;
		visibility: hidden;
		opacity: 0;

		cursor: pointer;

		transition: all 150ms ease-in-out;

		&:hover {
			background-color: var(--clr-secondary);

			svg {
				color: var(--clr-text-light);
			}
		}

		& > svg {
			$size: 1.125rem;
			height: $size;
			width: $size;
			color: var(--clr-secondary);
		}
	}
}
</style>
