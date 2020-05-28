import * as React from 'react';
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {
	calculateDateDifference,
	letterBodyLength,
	letterBodyWhiteSpaceCount,
	letterBodyWordsCount
} from '../../../utils';
import { v4 } from 'node-uuid';
import { currentIdSelector, lettersLength, lettersSelector, settingsSelector } from '../../../selectors';
import { LetterButton, LetterPortal } from '../../components';
import { newLetter, selectCurrent } from '../../../actions';
import { LetterSettings } from '..';
import { LanguageContext } from '../../context/language-context';

import './letter-footer-info.scss';

export const LetterFooterInfo = () => {
	const lang = useContext(LanguageContext);
	const {language} = useSelector(settingsSelector);
	const [settingsShown, setSettingsShown] = useState(false);
	const current = useSelector(currentIdSelector);
	const lettersCount = useSelector(lettersLength);

	const currentLetter = createSelector(
		lettersSelector,
		(letters) =>
			letters.find(({id}) => id === current) || {body: '', dateCreated: ''}
	);

	const infoSelector = createSelector(
		currentLetter,
		({body, dateCreated}) => ({
			length: letterBodyLength(body),
			wordCount: letterBodyWordsCount(body),
			whiteSpace: letterBodyWhiteSpaceCount(body),
			timeDifference: calculateDateDifference(dateCreated, language)
		})
	);

	const dispatch = useDispatch();

	const handleClick = () => {
		const id = v4();
		dispatch(newLetter(id));
		dispatch(selectCurrent(id));
	};

	const {length, wordCount, whiteSpace, timeDifference} = useSelector(infoSelector);

	return (
		<div className='letter-footer-info'>
			<div className='letter-footer-info-button'>
				<LetterButton
					handleClick={handleClick}
					tooltipText={lang['tooltip.button.new']}
					tooltipMargin='bottom'
					isDisabled={lettersCount === 10}
					styles='letter-footer-info-button--hover'
				>
					<span>{lang['button.new']} &#x2709;</span>
				</LetterButton>
			</div>
			<LetterButton
				styles='letter-footer-info-element letter-footer-info-button--hover'
				handleClick={() => setSettingsShown(true)}
				tooltipText={lang['tooltip.button.settings']}
				tooltipMargin='bottom'
			>
				<span>{lang['button.settings']} &#x2699;</span>
			</LetterButton>
			<span className='letter-footer-info-element'>
				{lang['info.word.count']}: {wordCount}
			</span>
			<span className='letter-footer-info-element'>
				{lang['info.white.space']}: {whiteSpace}
			</span>
			<span className='letter-footer-info-element'>
				{lang['info.symbols.count']}: {length}
			</span>
			<span className='letter-footer-info-element'>
				{lang['info.created']} {timeDifference} {lang['info.created.ago']}
			</span>
			{settingsShown &&
				<LetterPortal>
					<LetterSettings
						setSettingsShown={setSettingsShown}
					/>
				</LetterPortal>
			}
		</div>
	);
};

LetterFooterInfo.displayName = 'LetterFooterInfo';
