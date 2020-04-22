import {UPDATE_SETTINGS, UpdateSettingsType} from '../actions';
import {Settings} from '../store';

const initialState: Settings = {
	onlyTheme: true,
	currentTheme: 'default',
	showCurrent: true
};

export const settings = (state = initialState, action: UpdateSettingsType) => {
	switch (action.type) {
		case UPDATE_SETTINGS:
			return {
				...state,
				[action.key]: action.value
			};
		default:
			return state;
	}
};
