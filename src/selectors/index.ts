import {createSelector} from 'reselect';
import {State} from '../store';

export const currentIdSelector = (state: State) => state.current;

export const lettersSelector = (state: State) => state.letters;

export const lettersLength = createSelector(
	lettersSelector,
	letters => letters.length
);
