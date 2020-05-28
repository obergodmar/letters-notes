import { Current } from '../store';
import { ActionWithIdType, SELECT_CURRENT } from '../actions';
import { currentLetter } from './letters';

const initialState: Current = currentLetter;

export const current = (state = initialState, action: ActionWithIdType) => (
	action.type === SELECT_CURRENT ? (
		action.id
	) : (
		state
	)
);
