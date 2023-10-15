<template>
	<AuthLayout>
		<section class="login">
			<div class="login__card">
				<Logo2DO4U class="login__logo" />
				<h1 class="login__title">Entrar</h1>
				<p class="login__description">
					Seja bem-vindo! Entre para<br />
					organizar suas tarefas de forma fácil<br />
					e rápida.
				</p>
				<LoginPageForm />
			</div>
		</section>
	</AuthLayout>
</template>

<script setup lang="ts">
import AuthLayout from '@/layouts/AuthLayout.vue';
import Logo2DO4U from '@/components/icons/Logo2DO4U.vue';
import LoginPageForm from './partials/LoginPageForm.vue';
</script>

<style lang="scss" scoped>
.login {
	$self: &;
	position: relative;

	&__card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 4rem;

		gap: 1.5rem;

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
