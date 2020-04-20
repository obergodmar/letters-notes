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
	width: number;
}

export type Current = string;

export type LetterState = Letter[];

export interface State {
	letters: LetterState;
	current: Current;
}
