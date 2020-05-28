export interface Letter {
	title: string;
	body: string;
	id: string;
	isFavorite: boolean;
	theme: string;
	dateCreated: string;
	dateModified: string;
}

export interface Positioning {
	left: number;
	top: number;
}

export type Current = string;

export type LetterState = Letter[];

export interface State {
	letters: LetterState;
	current: Current;
	settings: Settings;
}

export interface Settings {
	onlyTheme: boolean;
	currentTheme: string;
	showCurrent: boolean;
	language: 'ru' | 'en';
}
