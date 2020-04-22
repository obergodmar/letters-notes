import {
	LOAD_SETTINGS,
	UPDATE_SETTINGS,
	SettingsType
} from '../actions';
import {Settings} from '../store';

const initialState: Settings = {
	onlyTheme: true,
	currentTheme: 'default',
	showCurrent: true
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
