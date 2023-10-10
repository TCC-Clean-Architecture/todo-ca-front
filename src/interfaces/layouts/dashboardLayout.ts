import { type Ref } from 'vue';

export interface IDashboardLayoutOptions {
	collapsed: Readonly<Ref<boolean>>;
	toggleCollapse: (value?: boolean | undefined) => boolean;
}
