import * as React from 'react';
import {forwardRef, Ref, RefObject} from 'react';
import {ClipboardEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ContentEditable, {ContentEditableEvent} from 'react-contenteditable';
import {createSelector} from 'reselect';
import {fillLetterBody} from '../../../actions';
import {
	currentLetterSelector,
	lettersSelector
} from '../../../selectors';
import './letter-body-input.scss';

export const LetterBodyInput = forwardRef((
	_,
	bodyInputRef: Ref<HTMLInputElement>
) => {
	const current = useSelector(currentLetterSelector);
	const currentLetter = createSelector(
		lettersSelector,
		(letters) =>
			letters.find(({id}) => id === current) || {id: '', body: ''}
	);
	const {id, body} = useSelector(currentLetter);

	const dispatch = useDispatch();

	const handleChange = (e: ContentEditableEvent) => {
		const {value} = e.target as HTMLTextAreaElement;
		dispatch(fillLetterBody(value, id));
	};

	const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
		e.preventDefault();

		const text = e.clipboardData.getData('text/plain');
		document.execCommand('insertHTML', false, text);
	};

	return (
		<ContentEditable
			html={body}
			innerRef={bodyInputRef as RefObject<HTMLInputElement>}
			className='letter-body-input'
			onChange={handleChange}
			onPaste={handlePaste}
			placeholder='Your letter here...'
		/>
		);
	}
);

LetterBodyInput.displayName = 'LetterBodyInput';
