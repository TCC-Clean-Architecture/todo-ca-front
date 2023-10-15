<template>
	<span class="status" :class="[`status--${status}`]">
		{{ parseStatus(status) }}
	</span>
</template>

<script lang="ts" setup>
import getAvailableStatus from '@/utils/getAvailableStatus';

/* -- Props -- */

interface Props {
	status: string;
}

defineProps<Props>();

/* -- Methods -- */

const parseStatus = (status: string) => {
	return getAvailableStatus(status).name;
};
</script>

<style lang="scss" scoped>
.status {
	display: flex;
	align-items: center;
	justify-content: center;

	height: 28px;
	padding-inline: 1.25rem;

	font-size: 0.75rem;
	font-weight: 600;
	color: var(--clr-text-inverse-1);

	background-color: var(--clr-primary);
	border-radius: 0.625rem;

	&--done {
		background-color: var(--clr-success);
	}
	&--inprogress {
		background-color: var(--clr-warning);
	}
	&--todo {
		background-color: var(--clr-info);
	}
	&--unknown {
		background-color: var(--clr-mute);
		color: var(--clr-mute-darker);
	}
}
</style>
