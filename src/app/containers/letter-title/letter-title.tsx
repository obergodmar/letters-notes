import * as React from 'react';
import { RefObject } from 'react';
import { LetterTitleInput, ThemeButtons } from '../../components';

import './letter-title.scss';

interface Props {
	bodyInputRef: RefObject<HTMLInputElement>;
}

export const LetterTitle = ({bodyInputRef}: Props) => {
	return (
		<div className='letter-title'>
			<LetterTitleInput bodyInputRef={bodyInputRef} />
			<ThemeButtons />
		</div>
	);
};

LetterTitle.displayName = 'LetterTitle';
