import {State} from './types';

export const loadState = (): State | undefined => {
	try {
		const serializedState = localStorage.getItem('state');
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (_) {
		return undefined;
	}
};

export const saveState = (state: State): void => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	} catch (_) {
		// Error happen.
	}
};
