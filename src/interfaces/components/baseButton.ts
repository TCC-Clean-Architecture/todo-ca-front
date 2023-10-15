import type { DefaultThemes, DefaultSizes } from './global';

export type ButtonThemes = DefaultThemes;

export type ButtonVariants = 'plain' | 'text' | 'outline' | 'flat';

export type ButtonSizes = DefaultSizes;

export interface ButtonIcon {
	icon: string;
	props?: object;
}
