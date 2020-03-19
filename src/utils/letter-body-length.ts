export const letterBodyLength = (body: string): number => (
	body ? (
		body
			.replace(/\s+/g, '')
			.replace(/<.*?>/g, '')
			.replace(/&nbsp;/g, '')
			.length
	) : (
		0
	)
);
