import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createSelector} from 'reselect';
import {
	letterBodyWordsCount,
	letterBodyLength,
	letterBodyWhiteSpaceCount,
	calculateDateDifference
} from '../../../utils';
import {v4} from 'node-uuid';
import {
	currentIdSelector,
	lettersLength,
	lettersSelector
} from '../../../selectors';
import {LetterButton, LetterPortal} from '../../components';
import {newLetter, selectCurrent} from '../../../actions';
import './letter-footer-info.scss';
import {LetterSettings} from '..';
import {useState} from 'react';

export const LetterFooterInfo = () => {
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
			timeDifference: calculateDateDifference(dateCreated)
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
					tooltipText='Create new letter'
					tooltipMargin='bottom'
					isDisabled={lettersCount === 10}
					styles='letter-footer-info-button--hover'
				>
					<span>New Letter &#x2709;</span>
				</LetterButton>
			</div>
			<LetterButton
				styles='letter-footer-info-element letter-footer-info-button--hover'
				handleClick={() => setSettingsShown(true)}
				tooltipText='Open settings'
				tooltipMargin='bottom'
			>
				<span>Settings &#x2699;</span>
			</LetterButton>
			<span className='letter-footer-info-element'>
				Word count: {wordCount}
			</span>
			<span className='letter-footer-info-element'>
				White Space: {whiteSpace}
			</span>
			<span className='letter-footer-info-element'>
				Symbols count: {length}
			</span>
			<span className='letter-footer-info-element'>
				Created {timeDifference} ago
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
