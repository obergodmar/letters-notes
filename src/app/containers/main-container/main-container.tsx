import * as React from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { currentIdSelector, currentThemeSelector, settingsSelector } from '../../../selectors';
import { LetterFooterInfo, LetterTitle, SideBar } from '..';
import { LetterBodyInput } from '../../components';

import './main-container.scss';

export const MainContainer = () => {
	const currentId = useSelector(currentIdSelector);

	let currentTheme = useSelector(currentThemeSelector(currentId));
	const settings = useSelector(settingsSelector);
	if (settings.onlyTheme) {
		currentTheme = settings.currentTheme;
	}

	const theme = `main-container theme-${currentTheme}`;

	const bodyInputRef = useRef<HTMLInputElement>(null);
	return (
		<div className={theme} id='main-container'>
			<LetterTitle bodyInputRef={bodyInputRef} />
			<div className='main-container-letter-body'>
				<SideBar />
				<LetterBodyInput ref={bodyInputRef} />
			</div>
			<LetterFooterInfo />
		</div>
	);
};

MainContainer.displayName = 'MainContainer';
