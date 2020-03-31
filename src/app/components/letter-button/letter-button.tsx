import * as React from 'react';
import {MouseEvent} from 'react';
import './letter-button.scss';

interface Props {
	children: JSX.Element;
	handleClick: (e: MouseEvent<HTMLButtonElement>) => void;
	isDisabled?: boolean;
	styles?: string;
}

export const LetterButton = ({
		children,
		handleClick,
		isDisabled = false,
		styles
}: Props) => (
	<button
		className={`letter-button ${styles} ${isDisabled && 'letter-button--disabled'}`}
		onClick={handleClick}
		disabled={isDisabled}
	>
		{children}
	</button>
);
