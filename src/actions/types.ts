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

export type LetterActionTypes =	FillTitleLetterType & FillBodyLetterType;

export interface ActionWithIdType {
	type: string;
	id: string;
}
