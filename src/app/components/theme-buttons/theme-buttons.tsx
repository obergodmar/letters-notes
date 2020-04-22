import * as React from 'react';
import {MouseEvent, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {currentIdSelector, currentThemeSelector, settingsSelector} from '../../../selectors';
import {setTooltipCoordinates} from '../../../utils';
import {LetterTooltip} from '..';
import {changeTheme, updateSettings} from '../../../actions';

import './theme-buttons.scss';

const themes = [
	{
		name: 'default',
		color: '#fef8f0'
	},
	{
		name: 'white',
		color: '#ffffff'
	},
	{
		name: 'oceanic',
		color: '#4b4b7e'
	},
	{
		name: 'dark',
		color: '#141414'
	}
];

export const ThemeButtons = () => {
	const themeButtonsRef = useRef<HTMLDivElement>(null);
	const currentSelector = useSelector(currentIdSelector);
	const [tooltipIsShown, setIsTooltipShown] = useState(false);

	const dispatch = useDispatch();

	const handleChangeTheme = (e: MouseEvent<HTMLDivElement>, theme: string) => {
		e.preventDefault();
		dispatch(changeTheme(currentSelector, theme));
		dispatch(updateSettings('currentTheme', theme));
	};

	let currentTheme = useSelector(currentThemeSelector(currentSelector));
	const settings = useSelector(settingsSelector);
	if (settings.onlyTheme) {
		currentTheme = settings.currentTheme;
	}

	themes.sort(({name}) => {
		if (name === currentTheme) {
			return 1;
		} else {
			return -1;
		}
	}).reverse();

	return (
		<div
			className='theme-buttons'
			ref={themeButtonsRef}
		>
			{themes.map(({name, color}) => (
				<div
					key={name}
					style={
						{
							backgroundColor: color,
							border: name === currentTheme ? 'none' : '',
							cursor: name === currentTheme ? 'default' : 'pointer'
						}
					}
					className='theme-buttons-element'
					onClick={e => handleChangeTheme(e, name)}
					onMouseEnter={() => setIsTooltipShown(!(name === currentTheme))}
					onMouseLeave={() => setIsTooltipShown(false)}
				/>
			))}
			{tooltipIsShown  &&
				<LetterTooltip
					tooltipText='Change theme'
					margin='top'
					coordinates={setTooltipCoordinates(themeButtonsRef)}
				/>}
		</div>
	);
};

ThemeButtons.displayName = 'ThemeButtons';
