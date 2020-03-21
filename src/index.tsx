import * as React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {devToolsEnhancer} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import reducer from './reducers';
import {App} from './app/main';
import {loadState, saveState} from './store';

const persistedState = loadState();
const store = createStore(reducer, persistedState, devToolsEnhancer({}));

store.subscribe(() => {
	saveState(store.getState());
});

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
);
