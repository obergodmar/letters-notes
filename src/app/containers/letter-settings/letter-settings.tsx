import * as React from 'react';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LetterButton, LetterCheckbox } from '../../components';
import { settingsSelector } from '../../../selectors';
import { updateSettings } from '../../../actions';
import { LanguageContext } from '../../context/language-context';

import './letter-settings.scss';

interface Props {
	setSettingsShown: (choice: boolean) => void;
}

export const LetterSettings = ({setSettingsShown}: Props) => {
	const lang = useContext(LanguageContext);
	const [isVisible, setVisible] = useState(false);
	const {onlyTheme, showCurrent, language} = useSelector(settingsSelector);
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

	return (
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
				<div className='letter-settings-window-title'>{lang['ui.settings']}</div>
				<div className='letter-settings-window-row'>
					<LetterCheckbox
						isChecked={onlyTheme}
						setChecked={() => dispatch(updateSettings('onlyTheme', !onlyTheme))}
					/>
					<span className='letter-settings-window-row-text'>{lang['ui.settings.theme']}</span>
				</div>
				<div className='letter-settings-window-row'>
					<LetterCheckbox
						isChecked={showCurrent}
						setChecked={() => dispatch(updateSettings('showCurrent', !showCurrent))}
					/>
					<span className='letter-settings-window-row-text'>{lang['ui.settings.current']}</span>
				</div>
				<div className='letter-settings-window-row'>
					<LetterCheckbox
						isChecked={language === 'ru'}
						setChecked={() => dispatch(updateSettings('language', 'ru'))}
					/>
					<span className='letter-settings-window-row-text'>{lang['ui.settings.ru']}</span>
					<LetterCheckbox
						isChecked={language === 'en'}
						setChecked={() => dispatch(updateSettings('language', 'en'))}
					/>
					<span className='letter-settings-window-row-text'>{lang['ui.settings.en']}</span>
				</div>
				<div className='letter-settings-window-row'>
					<LetterButton
						handleClick={() => {
						}}
						tooltipText={lang['button.tooltip.import']}
						tooltipMargin='top'
						children={<span>{lang['button.import']}</span>}
					/>
					<LetterButton
						handleClick={() => {
						}}
						tooltipText={lang['button.tooltip.export']}
						tooltipMargin='top'
						children={<span>{lang['button.export']}</span>}
					/>
				</div>
				<LetterButton
					tooltipText={lang['tooltip.close']}
					handleClick={handleClick}
					tooltipMargin='bottom'
					styles='letter-settings-window-button'
					children={<span>{lang['button.save']}</span>}
				/>
			</div>
		</div>
	);
};

LetterSettings.displayName = 'LetterSettings';
