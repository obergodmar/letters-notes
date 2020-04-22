import * as React from 'react';
import {useRef, useState} from 'react';
import {LetterTooltip} from '..';
import {setTooltipCoordinates} from '../../../utils';

import './letter-checkbox.scss';

interface Props {
	isChecked: boolean;
	setChecked: () => void;
}

export const LetterCheckbox = ({isChecked, setChecked}: Props) => {
	const checkboxRef = useRef<HTMLDivElement>(null);
	const [tooltipIsShown, setIsTooltipShown] = useState(false);

	return (
		<>
			<div
				ref={checkboxRef}
				className='letter-checkbox'
				onClick={() => setChecked()}
				onMouseEnter={() => setIsTooltipShown(true)}
				onMouseLeave={() => setIsTooltipShown(false)}
			>
				<div className={isChecked ? (
					'letter-checkbox-core letter-checkbox-core--checked'
				) : ('letter-checkbox-core')}/>
			</div>
			{tooltipIsShown &&
				<LetterTooltip
					tooltipText={`Currently ${isChecked ? 'enabled' : 'disabled'}`}
					coordinates={setTooltipCoordinates(checkboxRef)}
					margin='bottom'
				/>}
		</>
	);
};

LetterCheckbox.displayName = 'LetterCheckbox';
