import * as React from 'react';
import { ClipboardEvent, forwardRef, Ref, RefObject, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { createSelector } from 'reselect';
import { fillLetterBody, updateSettings } from '../../../actions';
import { currentIdSelector, currentThemeSelector, lettersSelector, settingsSelector } from '../../../selectors';
import { LanguageContext } from '../../context/language-context';

import './letter-body-input.scss';

export const LetterBodyInput = forwardRef((
	_,
	bodyInputRef: Ref<HTMLInputElement>
	) => {
		const lang = useContext(LanguageContext);
		const current = useSelector(currentIdSelector);
		const currentLetter = createSelector(
			lettersSelector,
			(letters) =>
				letters.find(({id}) => id === current) || {id: '', body: ''}
		);
		const {id, body} = useSelector(currentLetter);
		const theme = useSelector(currentThemeSelector(current));
		const {onlyTheme, language} = useSelector(settingsSelector);

		const dispatch = useDispatch();

		useEffect(() => {
			if (!onlyTheme) {
				dispatch(updateSettings('currentTheme', theme));
			}
		}, [theme, onlyTheme]);

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
				className={`letter-body-input ${
					language === 'ru' ?
						'letter-body-input--ru'
						:
						'letter-body-input--en'
				}`
				}
				onChange={handleChange}
				onPaste={handlePaste}
				placeholder={lang['body.placeholder']}
			/>
		);
	}
);

LetterBodyInput.displayName = 'LetterBodyInput';
