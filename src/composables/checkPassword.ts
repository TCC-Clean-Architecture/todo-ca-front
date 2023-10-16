import { SPECIAL_CHARS } from '@/constants/regExps';
import { ref } from 'vue';

interface IFeedback {
	width?: string;
	color?: string;
	text?: string;
	status?: boolean;
}

export const useCheckPassword = () => {
	const feedback = ref<IFeedback>({});

	function checkPassword(text?: string | null) {
		let count = 0;

		if (!text) return;

		if (text.length >= 0) {
			count++;
			if (/\d/.test(text)) count++;
			if (SPECIAL_CHARS.test(text)) count++;
		}

		switch (count) {
			case 1:
				feedback.value = {
					width: '33%',
					color: '#e62737',
					text: 'Senha fraca',
					status: true,
				};
				break;
			case 2:
				feedback.value = {
					width: '66%',
					color: '#ff9f10',
					text: 'Senha mediana',
					status: true,
				};
				break;
			case 3:
				feedback.value = {
					width: '100%',
					color: '#5dc90a',
					text: 'Senha forte!',
					status: true,
				};
				break;
		}
	}
	return { checkPassword, feedback };
};
