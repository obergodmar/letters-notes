import * as React from 'react';
import {MainContainer} from './containers';
import {useEffect} from 'react';

import './styles/reset.scss';
import './styles/themes.scss';

export const App = () => {
	const updateStore = () => window.location.reload();

	useEffect(() => {
		window.addEventListener('storage', () => updateStore());
		return () => {
			window.removeEventListener('storage', updateStore);
		};
	}, []);

	return (
		<MainContainer />
	);
};

App.displayName = 'App';
