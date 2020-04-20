import * as React from 'react';
import ReactDOM from 'react-dom';
import {Positioning} from '../../../store';
import './letter-tooltip.scss';
import {useEffect, useState} from 'react';

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

	let root = document.getElementById('main-container');
	if (!root) {
		root = document.createElement('div');
		document.appendChild(root);
	}
	let transform: {};
	if (margin === 'top') {
		transform = {transform: 'translateY(6vh)'};
	} else {
		transform = {transform: 'translateY(-6vh)'};
	}

	const styles = {...transform, ...coordinates};

	return (
		ReactDOM.createPortal(
			<div
				style={{opacity: visible ? '1' : '0', ...styles}}
				className='letter-tooltip'
			>
				<span className='letter-tooltip-text'>
					{tooltipText}
				</span>
			</div>,
			root
		)
	);
};

LetterTooltip.displayName = 'LetterTooltip';
