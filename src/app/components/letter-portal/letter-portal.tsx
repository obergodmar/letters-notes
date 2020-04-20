import {FunctionComponent, ReactComponentElement} from 'react';
import { createPortal } from 'react-dom';

interface Props {
	children: ReactComponentElement<FunctionComponent>;
}

export const LetterPortal = ({ children }: Props) => {
	let main = document.getElementById('main-container');
	if (!main) {
		main = document.createElement('div');
		document.appendChild(main);
	}

	return createPortal(children, main);
};

LetterPortal.displayName = 'LetterPortal';
