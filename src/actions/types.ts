import {LetterState, Settings} from '../store';

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

export type LetterActionTypes =
	FillTitleLetterType &
	FillBodyLetterType &
	ChangeThemeType &
	LoadLettersType;

export interface ActionWithIdType {
	type: string;
	id: string;
}

export interface UpdateSettingsType {
	type: string;
	key: string;
	value: boolean | string;
}

export type SettingsType = UpdateSettingsType & LoadSettingsType;

export interface LoadLettersType {
	type: string;
	letters: LetterState;
}

export interface LoadSettingsType {
	type: string;
	settings: Settings;
}
