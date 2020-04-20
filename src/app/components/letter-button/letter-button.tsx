import * as React from 'react';
import {MouseEvent, useRef, useState} from 'react';
import './letter-button.scss';
import {LetterTooltip} from '..';
import {setTooltipCoordinates} from '../../../utils';

interface Props {
	children: JSX.Element;
	handleClick: (e: MouseEvent<HTMLButtonElement>) => void;
	tooltipText: string;
	tooltipMargin: string;
	isDisabled?: boolean;
	styles?: string;
}

export const LetterButton = ({
		children,
		handleClick,
		isDisabled = false,
		styles,
		tooltipText,
		tooltipMargin
}: Props) => {
	const [tooltipIsShown, setIsTooltipShown] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null);

	return (
		<>
			<button
				ref={buttonRef}
				className={`letter-button ${styles} ${isDisabled && 'letter-button--disabled'}`}
				onClick={handleClick}
				disabled={isDisabled}
				onMouseEnter={() => setIsTooltipShown(true)}
				onMouseLeave={() => setIsTooltipShown(false)}
			>
				{children}
			</button>
			{tooltipIsShown  &&
				<LetterTooltip
					tooltipText={tooltipText}
					margin={tooltipMargin}
					coordinates={setTooltipCoordinates(buttonRef)}
				/>}
			</>
	);
};
