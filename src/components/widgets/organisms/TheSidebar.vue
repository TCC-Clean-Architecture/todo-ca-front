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
		<nav class="sidebar__navigation">
			<RouterLink
				:to="() => routesNames.home"
				class="sidebar__link"
				activeClass="sidebar__link--active"
			>
				<i class="link__icon"><IconHome /></i>
				<span v-show="!layout.collapsed">{{ routesNames.home }}</span>
			</RouterLink>
		</nav>
		<div class="sidebar__misc">
			<SwitchColorTheme />
		</div>
	</div>
</template>

<script lang="ts" setup>
import Logo2DO4U from '@/components/icons/Logo2DO4U.vue';
import LogoCollapsed2DO4U from '@/components/icons/LogoCollapsed2DO4U.vue';
import IconAngles from '@/components/icons/IconAngles.vue';
import IconHome from '@/components/icons/IconHome.vue';
import BaseDivider from '@/components/widgets/atoms/BaseDivider.vue';
import SwitchColorTheme from '@/components/widgets/atoms/SwitchColorTheme.vue';

import { inject } from 'vue';
import { useRoutesNames } from '@/plugins/core';
import { LAYOUT_CONFIG_KEY } from '@/constants/injectionKeys';

/* -- Plugins -- */

const routesNames = useRoutesNames();

/* -- Injects -- */

const layout = inject(LAYOUT_CONFIG_KEY)!;

/* -- Emits -- */

const emit = defineEmits<{
	(e: 'collapse-menu'): void;
}>();

/* -- Methods -- */

const onCollapseMenu = () => {
	emit('collapse-menu');
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

		#{$self}__navigation {
			margin-inline: 0.75rem;
		}

		#{$self}__link {
			justify-content: center;

			background-color: var(--clr-secondary);

			border-radius: 0.375rem;

			&--active .link__icon {
				color: var(--clr-bg-soft);
			}

			&::after {
				display: none;
			}
		}

		#{$self}__button-collapse > svg {
			rotate: 180deg;
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

	&__navigation {
		display: flex;
		flex-direction: column;
		margin-block: 1rem;
		margin-inline-start: 1.5rem;
	}

	&__link {
		position: relative;

		display: flex;
		align-items: center;
		gap: 0.5rem;

		height: 2.5rem;

		color: var(--clr-primary);

		transition: all 150ms ease-in-out;

		&:hover {
			background-color: var(--clr-bg-soft-up);
		}

		&--active {
			&::after {
				content: '';

				width: 0.25rem;
				height: 100%;

				margin-inline-start: auto;

				background-color: var(--clr-secondary);
			}

			.link__icon {
				color: var(--clr-secondary);
			}
		}

		span {
			font-size: 1rem;
			font-weight: 700;
			line-height: 1rem;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}

		.link__icon {
			margin: 0.25rem;

			$size: 1.5rem;
			height: $size;
			width: $size;

			& > svg {
				width: inherit;
				height: inherit;
			}
		}
	}

	&__misc {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-block-start: auto;
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
