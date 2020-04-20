import {FunctionComponent, ReactComponentElement, useEffect, useState} from 'react';
import { createPortal } from 'react-dom';

interface Props {
	children: ReactComponentElement<FunctionComponent>;
}

export const LetterPortal = ({ children }: Props) => {
	const [mountpoint, setMountpoint] = useState(document.body);

	useEffect(() => {
		const mount = document.getElementById('main-container');
		if (!mount) {
			setMountpoint(document.body);
		} else {
			setMountpoint(mount);
		}
	}, []);

	if (!mountpoint) {
		setMountpoint(document.body);
	}

	return createPortal(children, mountpoint as Element);
};

LetterPortal.displayName = 'LetterPortal';
