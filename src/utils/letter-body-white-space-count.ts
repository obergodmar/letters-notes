export const letterBodyWhiteSpaceCount = (body: string) => {
	const whiteSpace = body.match(/(&nbsp;)|(<div>)|\s/g);

	return whiteSpace ? whiteSpace.length : 0;

};
