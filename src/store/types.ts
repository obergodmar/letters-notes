export interface Letter {
	title: string;
	body: string;
	id: string;
	isFavorite: boolean;
	theme: string;
	dateCreated: string;
	dateModified: string;
}

export type Current = string;

export type LetterState = Letter[];

export interface State {
	letters: LetterState;
	current: Current;
}
