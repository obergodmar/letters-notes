import * as React from 'react';
import {useRef} from 'react';
import {LetterFooterInfo, SideBar} from '..';
import {LetterBodyInput, LetterTitleInput} from '../../components';
import './main-container.scss';

export const MainContainer = () => {
	const bodyInputRef = useRef<HTMLInputElement>(null);
	return (
		<div className='main-container'>
			<LetterTitleInput bodyInputRef={bodyInputRef} />
			<div className='main-container-letter-body'>
				<SideBar />
				<LetterBodyInput ref={bodyInputRef}/>
			</div>
			<LetterFooterInfo />
		</div>
	);
};
