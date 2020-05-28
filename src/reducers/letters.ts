import {
	CHANGE_THEME,
	DELETE_LETTER,
	FILL_LETTER_BODY,
	FILL_LETTER_TITLE,
	LetterActionTypes,
	LOAD_LETTERS,
	MAKE_FAVORITE,
	NEW_LETTER
} from '../actions';
import { LetterState } from '../store';
import { v4 } from 'node-uuid';

export const currentLetter = v4();

const initialState: LetterState = [
	{
		id: currentLetter,
		title: '',
		body: '',
		theme: 'default',
		isFavorite: false,
		dateCreated: Date(),
		dateModified: Date()
	}
];

export const letters = (state = initialState, action: LetterActionTypes) => {
	switch (action.type) {
		case NEW_LETTER:
			return [
				...state,
				{
					...initialState[0],
					id: action.id
				}
			];
		case FILL_LETTER_TITLE:
			return [...state].map(letter =>
				letter.id === action.id ? (
					{
						...letter,
						title: action.title,
						dateModified: Date()
					}
				) : (
					letter
				)
			);
		case FILL_LETTER_BODY:
			return [...state].map(letter =>
				letter.id === action.id ? (
					{
						...letter,
						body: action.body,
						dateModified: Date()
					}
				) : (
					letter
				)
			);
		case DELETE_LETTER:
			return [...state].filter(letter => letter.id !== action.id);
		case MAKE_FAVORITE:
			return [...state].map(letter =>
				letter.id === action.id ? (
					{
						...letter,
						isFavorite: !letter.isFavorite
					}
				) : (
					letter
				)
			);
		case CHANGE_THEME:
			return [...state].map(letter =>
				letter.id === action.id ? (
					{
						...letter,
						theme: action.theme
					}
				) : (
					letter
				)
			);
		case LOAD_LETTERS:
			return action.letters;
		default:
			return state;
	}
};
