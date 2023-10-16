<template>
	<div class="register__card">
		<Logo2DO4U class="register__logo" />
		<h1 class="register__title">Criar conta</h1>
		<p class="register__description">
			Crie sua conta para desfrutar da melhor<br />plataforma de organizacao de tarefas.
		</p>
		<RegisterAccountPageForm />
	</div>
</template>

<script setup lang="ts">
import Logo2DO4U from '@/components/icons/Logo2DO4U.vue';
import RegisterAccountPageForm from './partials/RegisterAccountPageForm.vue';
</script>

<style lang="scss" scoped>
.register {
	$self: &;

	&__card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;

		padding: 4rem;

		background-color: var(--clr-bg-soft);
		border-radius: 1.25rem;
		box-shadow: $elevation-1;
	}

	&__logo {
		width: 240px;
		height: auto;
	}

	&__title {
		font-weight: bold;
		font-size: 1.75rem;
		text-align: center;
		color: var(--clr-primary);
	}

	&__description {
		font-size: 1.125rem;
		text-align: center;
		line-height: 1.75rem;
		letter-spacing: 1px;

		color: var(--clr-primary-lighter);
	}
}
</style>
