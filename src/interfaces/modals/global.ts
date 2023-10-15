export type ModalKey = Symbol;

export interface IModalsPlugin {
	show: (modalName: ModalKey) => void;
	hide: (modalName: ModalKey) => void;
	toggle: (modalName: ModalKey) => void;
	status: (modalName: ModalKey) => boolean | undefined;
}
