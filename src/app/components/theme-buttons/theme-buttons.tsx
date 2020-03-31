import * as React from 'react';
import {MouseEvent} from 'react';
import {createSelector} from 'reselect';
import {useDispatch, useSelector} from 'react-redux';
import {currentIdSelector, lettersSelector} from '../../../selectors';
import {changeTheme} from '../../../actions';
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
	const currentSelector = useSelector(currentIdSelector);

	const dispatch = useDispatch();

	const handleChangeTheme = (e: MouseEvent<HTMLDivElement>, theme: string) => {
		e.preventDefault();
		dispatch(changeTheme(currentSelector, theme));
	};

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

	themes.sort(({name}) => {
		if (name === currentTheme) {
			return 1;
		} else {
			return -1;
		}
	}).reverse();

	return (
		<div className='theme-buttons'>
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
				/>
			))}
		</div>
	);
};

ThemeButtons.displayName = 'ThemeButtons';
