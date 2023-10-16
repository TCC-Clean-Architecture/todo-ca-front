<template>
	<form @submit.prevent class="register__form">
		<BaseInput
			class="register__name"
			v-model="form.name"
			:invalid="error === 'fillFields'"
			variant="outline"
			type="text"
			name="name"
			placeholder="Nome"
			required
		/>
		<BaseInput
			class="register__email"
			v-model="form.email"
			:invalid="error === 'fillFields' || error === 'registerFailed'"
			variant="outline"
			type="text"
			name="email"
			placeholder="Email"
			required
		/>
		<BasePassword
			class="register__password"
			v-model="form.password"
			:invalid="error === 'fillFields' || error === 'incompatiblePasswords'"
			variant="outline"
			name="password"
			placeholder="Senha"
			required
			@update:model-value="checkPassword($event as string)"
		/>
		<PasswordField
			class="register__confirm-password"
			v-model="form.confirmPassword"
			:invalid="error === 'fillFields' || error === 'incompatiblePasswords'"
			:feedback="feedback"
			variant="outline"
			name="confirm-password"
			placeholder="Confirmar senha"
			required
		/>
		<p v-if="error" class="register__error" v-text="errors[error]"></p>
		<BaseButton
			class="register__button"
			theme="secondary"
			pill
			:loading="loading"
			@click="doRegister()"
		>
			Criar
		</BaseButton>
		<span class="register__go-login">
			Já possui uma conta?
			<RouterLink to="/login" class="register__link"> Entre aqui </RouterLink>
		</span>
	</form>
</template>

<script setup lang="ts">
import BaseInput from '@/components/widgets/atoms/BaseInput.vue';
import BasePassword from '@/components/widgets/atoms/BasePassword.vue';
import PasswordField from '@/components/widgets/molecules/PasswordField.vue';
import BaseButton from '@/components/widgets/atoms/BaseButton.vue';

import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useRoutesNames } from '@/plugins/routesNames';
import { useAuthStore } from '@/stores/auth';
import { useCheckPassword } from '@/composables/checkPassword';

/* -- Plugins -- */

const router = useRouter();
const routesNames = useRoutesNames();
const authStore = useAuthStore();

/* -- Data -- */

interface IForm {
	name: string | undefined;
	email: string | undefined;
	password: string | undefined;
	confirmPassword: string | undefined;
}

const form: IForm = reactive({
	name: undefined,
	email: undefined,
	password: undefined,
	confirmPassword: undefined,
});

const errors = {
	fillFields: 'Preencha os campos para se cadastrar.',
	incompatiblePasswords: 'As senhas são incompatíveis. Por favor, verifique-as e tente novamente.',
	registerFailed:
		'Não foi possível cadastrar esse usuário, por favor verifique se o e-mail já foi registrado ou se o domínio é válido e tente novamente.',
};

type ErrorsKeys = keyof typeof errors;

const error = ref<ErrorsKeys>();
const loading = ref<boolean>(false);

const validation = computed(
	() => !form.name || !form.email || !form.password || !form.confirmPassword,
);
const passowordValidation = computed(
	() => !feedback.value?.status || form.password !== form.confirmPassword,
);

const { checkPassword, feedback } = useCheckPassword();

/* -- Methods -- */

const doRegister = () => {
	error.value = undefined;

	if (validation.value) {
		error.value = 'fillFields';
		return;
	}

	if (passowordValidation.value) {
		error.value = 'incompatiblePasswords';
		return;
	}

	loading.value = true;

	const body = {
		name: form.name!,
		email: form.email!,
		password: form.password!,
	};

	authStore
		.registerUser(body)
		.then(() => {
			router.push({ name: routesNames.registerConfirm, query: { check: 'true' } });
		})
		.catch(() => {
			error.value = 'registerFailed';
		})
		.finally(() => {
			loading.value = false;
		});
};
</script>

<style lang="scss" scoped>
.register {
	$self: &;

	&__form {
		width: max(260px);

		display: flex;
		flex-direction: column;
		align-items: center;

		#{$self}__name,
		#{$self}__email,
		#{$self}__password {
			margin-block-end: 1rem;
		}

		#{$self}__confirm-password {
			margin-block-end: 0.375rem;
		}

		#{ $self }__error {
			margin-block: 0.5rem 0.75rem;
			margin-inline: 0.5rem;

			font-size: 0.75rem;
			font-weight: 500;
			align-self: flex-start;
			text-align: left;
			color: var(--clr-danger);
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

		#{$self }__go-login {
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
