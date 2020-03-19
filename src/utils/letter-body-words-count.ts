export const letterBodyWordsCount = (body: string): number => (
	body ? (
		body.replace(/\s|(&nbsp;)|(<.*?>)/g, ' ')
			.split(' ')
			.filter((text) => text !== '')
			.length
	) : (
		0
	)
);
