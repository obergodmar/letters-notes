import {
	FILL_LETTER_TITLE,
	FILL_LETTER_BODY,
	NEW_LETTER,
	SELECT_CURRENT,
	DELETE_LETTER,
	MAKE_FAVORITE
} from './constants';

import {ActionWithIdType, FillTitleLetterType, FillBodyLetterType} from './types';

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
