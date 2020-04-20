import * as React from 'react';
import {useEffect, useState} from 'react';

import './letter-settings.scss';

interface Props {
	setSettingsShown: (choice: boolean) => void;
}

export const LetterSettings = ({setSettingsShown}: Props) => {
	const [isVisible, setVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setVisible(true), 20);
		return () => {
			clearInterval(timer);
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
				</div>
			</div>
	);
};

LetterSettings.displayName = 'LetterSettings';
