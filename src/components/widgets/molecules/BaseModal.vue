<template>
	<Teleport to="#modals">
		<Transition name="modal-fade">
			<dialog class="modal" :class="$attrs.class" v-if="status">
				<div class="modal__backdrop"></div>

				<div class="modal__card" :style="{ '--modal-width': width }">
					<slot name="header">
						<div class="modal__header">
							<slot name="title">
								<h2 v-if="title" class="modal__title" v-text="title"></h2>
							</slot>
							<slot name="close-button">
								<BaseButton
									class="modal__close"
									icon="x-mark"
									size="sm"
									theme="secondary"
									variant="flat"
									@click="close()"
								/>
							</slot>
						</div>
					</slot>
					<div class="modal__content">
						<slot></slot>
					</div>
					<div class="modal__footer">
						<slot name="footer"></slot>
					</div>
				</div>
			</dialog>
		</Transition>
	</Teleport>
</template>

<script lang="ts" setup>
import BaseButton from '@/components/widgets/atoms/BaseButton.vue';

import { watchEffect } from 'vue';
import { syncRef, useVModel } from '@vueuse/core';
import { useModalsState } from '@/composables/modalsState';
import { useModal } from '@/composables/modal';
import type { ModalKey } from '@/interfaces';

defineOptions({
	inheritAttrs: false,
});

/* -- Plugins -- */

const modalsState = useModalsState();

/* -- Props -- */

interface IProps {
	name: ModalKey;
	modelValue?: boolean;
	width?: string;
	title?: string;
}

const props = withDefaults(defineProps<IProps>(), {
	width: '500px',
	modelValue: false,
});

/* -- Emits -- */

const emit = defineEmits<{
	(e: 'update:modelValue', value: boolean): void;
	(e: 'open'): void;
	(e: 'close'): void;
}>();

/* -- Composables -- */

const { status, close } = useModal(props.name, modalsState);
const modelStatus = useVModel(props, 'modelValue', emit);
syncRef(modelStatus, status);

/* -- Watch -- */

watchEffect(() => {
	if (status) emit('open');
	else emit('close');
});
</script>

<style lang="scss" scoped>
.modal {
	$self: &;
	position: fixed;
	top: 0;
	z-index: 20;

	display: grid;
	place-items: center;

	width: 100vw;
	min-height: 100vh;

	background: transparent;
	border: none;

	&__backdrop {
		position: absolute;
		inset: 0;

		z-index: -1;

		background: rgba(0, 0, 0, 0.2);
	}

	&__card {
		display: flex;
		flex-direction: column;
		width: var(--modal-width, 500px);

		background-color: var(--clr-bg-soft);
		border-radius: 1rem;
		box-shadow: $elevation-2;
	}

	&__header {
		display: flex;
		padding-block-start: 0.5rem;
		padding-inline: 2rem 0.5rem;
	}

	&__close {
		margin-inline-start: auto;
	}
}

.modal-fade-enter-from,
.modal-fade-leave-to {
	scale: 0;
	opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
	transition: all 250ms ease-in-out;
}
</style>
