export interface FillTitleLetterType {
	type: string;
	title: string;
	id: string;
}

export interface FillBodyLetterType {
	type: string;
	body: string;
	id: string;
}

export interface ChangeThemeType {
	type: string;
	id: string;
	theme: string;
}

export type LetterActionTypes =	FillTitleLetterType & FillBodyLetterType & ChangeThemeType;

export interface ActionWithIdType {
	type: string;
	id: string;
}
