import {createSelector} from 'reselect';
import {State} from '../store';

export const currentIdSelector = (state: State) => state.current;

export const lettersSelector = (state: State) => state.letters;

export const settingsSelector = (state: State) => state.settings;

export const currentThemeSelector = (currentId: string) => {
	const currentLetterSelector = createSelector(
		lettersSelector,
		(letters) =>
			letters.find(({id}) => id === currentId) || {theme: 'default'}
	);

	return createSelector(
		currentLetterSelector,
		({theme}) => theme
	);
};

export const lettersLength = createSelector(
	lettersSelector,
	letters => letters.length
);
