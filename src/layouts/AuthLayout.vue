<template>
	<div class="layout-auth">
		<div
			class="layout-auth__background"
			role="img"
			aria-label="Background login image"
			ref="layoutBackground"
			:style="{
				backgroundImage: `url(${background})`,
				backgroundSize: `calc(100% + ${strength * 2}px)`,
			}"
		></div>
		<main class="layout-auth__content">
			<slot />
		</main>
	</div>
</template>

<script lang="ts" setup>
import backgroundImage from '@/assets/images/background.jpg';

import { ref } from 'vue';
import { useMouseMoveBackground } from '@/composables/mouseMoveBackground';

/* -- Props -- */

interface IProps {
	background?: string;
}

withDefaults(defineProps<IProps>(), {
	background: backgroundImage,
});

const layoutBackground = ref<HTMLDivElement>();
const { strength, xPixels, yPixels } = useMouseMoveBackground(layoutBackground.value!);
</script>

<style lang="scss" scoped>
.layout-auth {
	position: relative;
	height: 100vh;

	overflow: hidden;

	&__background {
		position: fixed;
		isolation: isolate;
		z-index: 0;

		width: 100vw;
		height: 100vh;

		background-position-x: v-bind(xPixels);
		background-position-y: v-bind(yPixels);
	}

	&__content {
		position: relative;
		z-index: 10;

		width: 100%;
		height: 100%;
		display: grid;
		place-items: center;
	}
}
</style>
