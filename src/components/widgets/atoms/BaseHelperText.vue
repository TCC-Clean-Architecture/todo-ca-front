<template>
	<p class="helper-text" v-text="text" />
</template>

<script lang="ts" setup>
export interface HelperTextProps {
	text?: string;
	color?: string;
}

withDefaults(defineProps<HelperTextProps>(), { color: '#686868' });
</script>

<style lang="scss" scoped>
.helper-text {
	margin-block-start: 0.4rem;
	padding-inline: 0.25rem;

	font-size: 0.75rem;
	font-weight: 500;

	color: v-bind(color);
}
</style>
