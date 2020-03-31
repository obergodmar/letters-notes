import * as React from 'react';
import {useRef} from 'react';
import {useSelector} from 'react-redux';
import {createSelector} from 'reselect';
import {currentIdSelector, lettersSelector} from '../../../selectors';
import {LetterFooterInfo, LetterTitle, SideBar} from '..';
import {LetterBodyInput} from '../../components';
import './main-container.scss';

export const MainContainer = () => {
	const currentSelector = useSelector(currentIdSelector);
	const currentLetterSelector = createSelector(
		lettersSelector,
		(letters) =>
			letters.find(({id}) => id === currentSelector) || {theme: 'default'}
	);

	const currentThemeSelector = createSelector(
		currentLetterSelector,
		({theme}) => theme
	);

	const currentTheme = useSelector(currentThemeSelector);

	const theme = `main-container theme-${currentTheme}`;

	const bodyInputRef = useRef<HTMLInputElement>(null);
	return (
		<div className={theme}>
			<LetterTitle bodyInputRef={bodyInputRef}/>
			<div className='main-container-letter-body'>
				<SideBar />
				<LetterBodyInput ref={bodyInputRef}/>
			</div>
			<LetterFooterInfo />
		</div>
	);
};

MainContainer.displayName = 'MainContainer';
