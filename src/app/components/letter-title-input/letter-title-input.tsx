import * as React from 'react';
import { RefObject, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { createSelector } from 'reselect';
import { titleLengthLimiter } from '../../../utils';
import { fillLetterTitle } from '../../../actions';
import { currentIdSelector, lettersSelector, settingsSelector } from '../../../selectors';
import { LanguageContext } from '../../context/language-context';

import './letter-title-input.scss';

interface Props {
	bodyInputRef: RefObject<HTMLInputElement>;
}

export const LetterTitleInput = ({bodyInputRef}: Props) => {
	const lang = useContext(LanguageContext);
	const current = useSelector(currentIdSelector);
	const {language} = useSelector(settingsSelector);
	const currentLetter = createSelector(
		lettersSelector,
		(letters) =>
			letters.find(({id}) => id === current) || {id: '', title: ''}
	);

	const {id, title} = useSelector(currentLetter);

	const [inputWarning, handleWarning] = useState(false);
	const dispatch = useDispatch();

	const titleInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const {current} = titleInputRef;
		if (!current) {
			return;
		}
		current.focus();

		if (!titleLengthLimiter(title)) {
			handleWarning(true);
			current.disabled = true;
		} else {
			handleWarning(false);
			current.disabled = false;
		}
	}, [id, title]);

	const handleChange = (e: ContentEditableEvent) => {
		const {value} = e.target;

		if (!titleLengthLimiter(value)) {
			handleWarning(true);
		} else {
			handleWarning(false);
		}

		if (value === title) {
			return;
		}
		dispatch(fillLetterTitle(value, id));
	};

	const handleNewLine = (e: React.KeyboardEvent<HTMLDivElement>) => {
		const keyCode = e.keyCode || e.which;
		const {current} = bodyInputRef;

		if (keyCode === 13 && current) {
			e.preventDefault();
			current.focus();
		}
	};

	const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
		e.preventDefault();

		const text = e.clipboardData.getData('text/plain');
		document.execCommand('insertHTML', false, text);
	};

	const styles = inputWarning ? (
		'letter-title-input letter-title-input--warning'
	) : (
		'letter-title-input'
	);

	return (
		<ContentEditable
			html={title}
			className={`${styles} ${
				language === 'ru'
					?
					'letter-title-input--ru'
					: 'letter-title-input--en'
			}`
			}
			innerRef={titleInputRef}
			onChange={handleChange}
			onKeyDown={handleNewLine}
			onPaste={handlePaste}
			placeholder={lang['title.placeholder']}
		/>
	);
};

LetterTitleInput.displayName = 'LetterTitleInput';
