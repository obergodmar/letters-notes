import {Current} from '../store';
import {SELECT_CURRENT, ActionWithIdType} from '../actions';
import {currentLetter} from './letters';

const initialState: Current = currentLetter;

export const current = (state = initialState, action: ActionWithIdType) => (
	action.type === SELECT_CURRENT ? (
		action.id
	) : (
		state
	)
);
