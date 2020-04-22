import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {LetterButton, LetterCheckbox} from '../../components';
import {settingsSelector} from '../../../selectors';
import {updateSettings} from '../../../actions';

import './letter-settings.scss';

interface Props {
	setSettingsShown: (choice: boolean) => void;
}

export const LetterSettings = ({setSettingsShown}: Props) => {
	const [isVisible, setVisible] = useState(false);

	const {onlyTheme, showCurrent} = useSelector(settingsSelector);
	const dispatch = useDispatch();

	const handleClose = useCallback(({key}: KeyboardEvent) => {
		if (key === 'Escape') {
			handleClick();
		}
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => setVisible(true), 20);
		document.addEventListener('keydown', handleClose, false);
		return () => {
			clearInterval(timer);
			document.removeEventListener('keydown', handleClose);
		};
	}, []);

	const handleClick = () => {
		setVisible(false);
		setTimeout(() => setSettingsShown(false), 300);
	};

	return(
		<div className='letter-settings'>
			<div
				className='letter-settings--background'
				style={{opacity: isVisible ? '0.8' : '0'}}
				onClick={handleClick}
			/>
				<div
					className='letter-settings-window'
					style={{transform: isVisible ? 'translateY(0)' : 'translateY(-200%)'}}
				>
					<div className='letter-settings-window-title'>Settings</div>
					<div className='letter-settings-window-row'>
						<LetterCheckbox isChecked={onlyTheme} setChecked={() => dispatch(updateSettings('onlyTheme', !onlyTheme))} />
						<span className='letter-settings-window-row-text'>Use one theme for all letters</span>
					</div>
					<div className='letter-settings-window-row'>
						<LetterCheckbox isChecked={showCurrent} setChecked={() => dispatch(updateSettings('showCurrent', !showCurrent))} />
						<span className='letter-settings-window-row-text'>Show current letter in the left</span>
					</div>
					<LetterButton
						tooltipText='Close settings window'
						handleClick={handleClick}
						tooltipMargin='bottom'
						styles='letter-settings-window-button'
						children={<span>Save and Close</span>}
					/>
				</div>
			</div>
	);
};

LetterSettings.displayName = 'LetterSettings';
