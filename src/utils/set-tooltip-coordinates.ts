import {RefObject} from 'react';
import {Positioning} from '../store';

export const setTooltipCoordinates = (element: RefObject<HTMLElement> | undefined): Positioning => {
	if (!element || !element.current) {
		return {left: 0, top: 0};
	}
	const rect = element.current.getBoundingClientRect();
	const {x, y} = rect;
	return ({
		left: x,
		top: y
	});
};
