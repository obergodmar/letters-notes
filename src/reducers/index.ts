import {combineReducers} from 'redux';
import {letters} from './letters';
import {current} from './current';

export default combineReducers({
	letters,
	current
});
