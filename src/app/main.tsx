import * as React from 'react';
import { useEffect } from 'react';
import { MainContainer } from './containers';
import { LanguageContext } from './context/language-context';
import ru from '../locales/ru.json';
import en from '../locales/en.json';
import './styles/reset.scss';

import './styles/themes.scss';
import { useSelector } from 'react-redux';
import { settingsSelector } from '../selectors';

export const App = () => {
	const updateStore = () => window.location.reload();
	const {language} = useSelector(settingsSelector);

	useEffect(() => {
		window.addEventListener('storage', () => updateStore());
		return () => {
			window.removeEventListener('storage', updateStore);
		};
	}, []);

	return (
		<LanguageContext.Provider value={language === 'en' ? en : ru}>
			<MainContainer />
		</LanguageContext.Provider>
	);
};

App.displayName = 'App';
