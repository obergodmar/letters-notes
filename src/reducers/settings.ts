import { LOAD_SETTINGS, SettingsType, UPDATE_SETTINGS } from '../actions';
import { Settings } from '../store';

const initialState: Settings = {
	onlyTheme: true,
	currentTheme: 'default',
	showCurrent: true,
	language: 'en'
};

export const settings = (state = initialState, action: SettingsType) => {
	switch (action.type) {
		case UPDATE_SETTINGS:
			return {
				...state,
				[action.key]: action.value
			};
		case LOAD_SETTINGS:
			return action.settings;
		default:
			return state;
	}
};
