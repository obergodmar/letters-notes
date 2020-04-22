import {
	CHANGE_THEME,
	DELETE_LETTER,
	FILL_LETTER_BODY,
	FILL_LETTER_TITLE,
	MAKE_FAVORITE,
	NEW_LETTER,
	SELECT_CURRENT,
	UPDATE_SETTINGS,
	LOAD_LETTERS
} from './constants';

import {
	ActionWithIdType,
	ChangeThemeType,
	FillBodyLetterType,
	FillTitleLetterType,
	LoadLettersType, LoadSettingsType,
	UpdateSettingsType
} from './types';
import {LetterState, Settings} from '../store';

export const fillLetterTitle = (title: string, id: string): FillTitleLetterType => ({
	type: FILL_LETTER_TITLE,
	title,
	id
});

export const fillLetterBody = (body: string, id: string): FillBodyLetterType => ({
	type: FILL_LETTER_BODY,
	body,
	id
});

export const newLetter = (id: string): ActionWithIdType => ({
	type: NEW_LETTER,
	id
});

export const selectCurrent = (id: string): ActionWithIdType => ({
	type: SELECT_CURRENT,
	id
});

export const deleteLetter = (id: string): ActionWithIdType => ({
	type: DELETE_LETTER,
	id
});

export const makeFavorite = (id: string): ActionWithIdType => ({
	type: MAKE_FAVORITE,
	id
});

export const changeTheme = (id: string, theme: string): ChangeThemeType => ({
	type: CHANGE_THEME,
	id,
	theme
});

export const updateSettings = (key: string, value: boolean | string): UpdateSettingsType => ({
	type: UPDATE_SETTINGS,
	key,
	value
});

export const loadLetters = (letters: LetterState): LoadLettersType => ({
	type: LOAD_LETTERS,
	letters
});

export const loadSettings = (settings: Settings): LoadSettingsType => ({
	type: LOAD_LETTERS,
	settings
});
