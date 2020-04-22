import * as React from 'react';
import {useEffect, useState} from 'react';
import {Positioning} from '../../../store';
import {LetterPortal} from '..';

import './letter-tooltip.scss';

interface Props {
	tooltipText: string;
	margin: string;
	coordinates: Positioning;
}

export const LetterTooltip = ({tooltipText, coordinates, margin}: Props) => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setVisible(true), 300);
		return () => {
			clearInterval(timer);
		};
	}, []);

	let transform: {};
	if (margin === 'top') {
		transform = {transform: 'translateY(6vh)'};
	} else {
		transform = {transform: 'translateY(-6vh)'};
	}

	const styles = {...transform, ...coordinates};

	return (
		<LetterPortal>
			<div
				style={{opacity: visible ? '1' : '0', ...styles}}
				className='letter-tooltip'
			>
				<span className='letter-tooltip-text'>
					{tooltipText}
				</span>
			</div>
		</LetterPortal>
	);
};

LetterTooltip.displayName = 'LetterTooltip';
