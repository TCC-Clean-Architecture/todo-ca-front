<template>
	<form @submit.prevent class="login__form">
		<BaseInput
			class="login__user"
			v-model="form.email"
			:invalid="error === 'email' || error === 'loginFailed'"
			variant="outline"
			name="user"
			placeholder="Usuário"
			required
		/>
		<BasePassword
			class="login__password"
			v-model="form.password"
			:invalid="error === 'password' || error === 'loginFailed'"
			variant="outline"
			name="password"
			placeholder="Senha"
			required
		/>
		<p v-if="error && errors[error]" class="login__error" v-text="errors[error]"></p>
		<BaseButton class="login__button" theme="secondary" pill :loading="loading" @click="doLogin()">
			Entrar
		</BaseButton>
		<span class="login__go-signin">
			Não é cadastrado?
			<RouterLink to="register" class="login__link"> Registre-se aqui </RouterLink>
		</span>
	</form>
</template>

<script setup lang="ts">
import BaseInput from '@/components/widgets/atoms/BaseInput.vue';
import BasePassword from '@/components/widgets/atoms/BasePassword.vue';
import BaseButton from '@/components/widgets/atoms/BaseButton.vue';

import { ref, reactive } from 'vue';

interface IForm {
	email: string | undefined;
	password: string | undefined;
}

const form: IForm = reactive({ email: undefined, password: undefined });

const errors = {
	email: null,
	password: null,
	loginFailed:
		'Desculpe, não foi possível acessar sua conta. Por favor, verifique seu usuário ou senha e tente novamente.',
};

type ErrorsKeys = keyof typeof errors;

const error = ref<ErrorsKeys>();

const loading = ref<boolean>(false);

const doLogin = () => {
	if (!form.email) {
		error.value = 'email';
		return;
	}

	if (!form.password) {
		error.value = 'password';
		return;
	}

	loading.value = true;

	const body = {
		email: form.email,
		password: form.password,
	};
};
</script>

<style lang="scss" scoped>
.login {
	$self: &;

	&__form {
		width: max(260px);
		display: flex;
		flex-direction: column;
		align-items: center;

		#{$self}__user {
			margin-block-end: 1rem;
		}

		#{$self}__password {
			margin-block-end: 0.375rem;
		}

		#{$self}__button {
			position: relative;

			height: 40px;
			width: 100%;
			margin-block: 2.5rem 1.5rem;

			background-color: var(--clr-secondary);
			border-radius: 100vw;

			color: var(--clr-text-inverse-1);
			font-weight: 600;

			transition: background-color 200ms ease-in-out;

			&:hover {
				background-color: var(--clr-secondary-dark);
			}
		}

		#{ $self }__error {
			color: $c-danger;
			align-self: flex-start;
			text-align: left;
			max-width: 250px;
			font-weight: 500;
			font-size: 12px;
			margin-block: 0.5rem 0.75rem;
			margin-inline: 0.5rem;
		}

		#{$self }__go-signin {
			font-weight: 500;
			font-size: 0.75rem;
			line-height: 17px;
			color: var(--clr-primary-dark);
		}

		#{$self }__link {
			color: var(--clr-primary-light);
			text-decoration: underline;

			transition:
				text-decoration 100ms ease-in-out,
				color 100ms ease-in-out;

			&:hover {
				text-decoration: none;
				color: var(--clr-primary);
			}
		}
	}
}
</style>
