import { combineReducers } from 'redux';
import { letters } from './letters';
import { current } from './current';
import { settings } from './settings';

export default combineReducers({
	letters,
	current,
	settings
});
