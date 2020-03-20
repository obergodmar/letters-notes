import {createSelector} from 'reselect';
import {State} from '../store';

export const currentLetterSelector = (state: State) => state.current;

export const lettersSelector = (state: State) => state.letters;

export const lettersLength = createSelector(
	lettersSelector,
	letters => letters.length
);