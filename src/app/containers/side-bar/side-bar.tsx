import * as React from 'react';
import {MouseEvent, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {State} from '../../../store';
import {LetterButton} from '../../components';
import {calculateDateDifference, sortByDateModified} from '../../../utils';
import {deleteLetter, makeFavorite, selectCurrent} from '../../../actions';
import {lettersSelector, settingsSelector} from '../../../selectors';

import './side-bar.scss';

export const SideBar = () => {
	const current = useSelector((state: State) => state.current);
	const {showCurrent} = useSelector(settingsSelector);

	let letters = useSelector(lettersSelector);
	if (!showCurrent) {
		letters = letters.filter(({id}) => id !== current);
	}
	const sortedLetters = useMemo(() => sortByDateModified(letters), [letters]);
	const dispatch = useDispatch();

	const handleSelectCurrent = (e: MouseEvent<HTMLDivElement>, id: string) => {
		e.preventDefault();
		dispatch(selectCurrent(id));
	};

	const handleDeleteLetter = (e: MouseEvent<HTMLButtonElement>, id: string) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch(deleteLetter(id));
	};

	const handleFavorite = (e: MouseEvent<HTMLButtonElement>, id: string) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch(makeFavorite(id));
	};

	return (
		<div className='side-bar'>
			{sortedLetters && sortedLetters.length ? (
				sortedLetters.map((letter, index) => (
					<div
						className={current === letter.id ? 'side-bar-letter side-bar-letter--selected' : 'side-bar-letter'}
						onClick={(e) => handleSelectCurrent(e, letter.id)}
						key={letter.id}
					>
						<div className='side-bar-letter-header'>
							<span className='side-bar-letter-header-title'
							>
								{letter.title.replace(/&nbsp;/g, '') || 'Unnamed'}
							</span>
							{sortedLetters.length !== 1 && (
								<LetterButton
									styles='side-bar-letter-header-button'
									handleClick={(e: MouseEvent<HTMLButtonElement>) => handleDeleteLetter(e, letter.id)}
									tooltipText='Delete letter'
									tooltipMargin='top'
								>
									<span>&#x2716;</span>
								</LetterButton>
							)}
						</div>
						<div className='side-bar-letter-info'>
							<LetterButton
								styles='side-bar-letter-info-button'
								handleClick={(e: MouseEvent<HTMLButtonElement>) => handleFavorite(e, letter.id)}
								tooltipText='Add to Favorites'
								tooltipMargin='top'
							>
								{letter.isFavorite ? (
										<span>{index + 1} &#x2605;</span>
									) : (
										<span>{index + 1} &#9734;</span>
									)}
							</LetterButton>
							<span className='side-bar-letter-info-date'>
								Modified {calculateDateDifference(letter.dateModified)} ago
							</span>
						</div>
					</div>
				))
			) : (
				<div className='side-bar--empty'>
					You have no other letters now
				</div>
			)}
		</div>
	);
};

SideBar.displayName = 'SideBar';
