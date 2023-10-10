import { type InjectionKey } from 'vue';
import { type IDashboardLayoutOptions } from '@/interfaces';

export const LAYOUT_CONFIG_KEY: InjectionKey<IDashboardLayoutOptions> = Symbol('layout-config');
