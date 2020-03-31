import * as React from 'react';
import {RefObject, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ContentEditable, {ContentEditableEvent} from 'react-contenteditable';
import {createSelector} from 'reselect';
import {titleLengthLimiter} from '../../../utils';
import {fillLetterTitle} from '../../../actions';
import {currentIdSelector, lettersSelector} from '../../../selectors';
import './letter-title-input.scss';

interface Props {
	bodyInputRef: RefObject<HTMLInputElement>;
}

export const LetterTitleInput = ({bodyInputRef}: Props) => {
	const current = useSelector(currentIdSelector);
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
	}, [id]);

	const handleChange = (e: ContentEditableEvent) => {
		const {value} = e.target;

		if (!titleLengthLimiter(value)) {
			handleWarning(true);
		} else {
			handleWarning(false);
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
			className={styles}
			innerRef={titleInputRef}
			onChange={handleChange}
			onKeyDown={handleNewLine}
			onPaste={handlePaste}
			placeholder='Letter title here...'
		/>
	);
};

LetterTitleInput.displayName = 'LetterTitleInput';
