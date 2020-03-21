import {
	LetterActionTypes,
	DELETE_LETTER,
	FILL_LETTER_BODY,
	FILL_LETTER_TITLE,
	NEW_LETTER, MAKE_FAVORITE
} from '../actions';
import {LetterState} from '../store';
import {v4} from 'node-uuid';

export const currentLetter = v4();

const initialState: LetterState = [
	{
		id: currentLetter,
		title: '',
		body: '',
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
					id: action.id,
					title: '',
					body: '',
					isFavorite: false,
					dateCreated: Date(),
					dateModified: Date()
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
		default:
			return state;
	}
};
