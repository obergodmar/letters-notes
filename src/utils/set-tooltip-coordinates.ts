import {RefObject} from 'react';
import {Positioning} from '../store';

export const setTooltipCoordinates = (element: RefObject<HTMLElement> | undefined): Positioning => {
	if (!element || !element.current) {
		return {width: 0, left: 0, top: 0};
	}
	const rect = element.current.getBoundingClientRect();
	const {x, y, width} = rect;
	return ({
		left: x,
		width: width > 50 ? width : 200,
		top: y
	});
};
