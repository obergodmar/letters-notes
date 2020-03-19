import * as React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {devToolsEnhancer} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import reducer from './reducers';
import {App} from './app/main';

const store = createStore(reducer, devToolsEnhancer({}));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
);
