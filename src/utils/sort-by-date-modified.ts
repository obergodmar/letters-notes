import {Letter} from '../store';

export const sortByDateModified = (letters: Letter[]): Letter[] => (
	[...letters].sort((a, b) => {
		const aDate = new Date(a.dateModified);
		const bDate = new Date(b.dateModified);
		return aDate > bDate ? (
			-1
		) : (
			aDate < bDate ? (
				1
			) : (
				0
			)
		);
	})
);
