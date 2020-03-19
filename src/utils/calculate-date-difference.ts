export const calculateDateDifference = (dateModifiedString: string): string => {
	const dateModified = new Date(dateModifiedString).getTime();
	const dateNow = new Date().getTime();
	const difference = (dateNow - dateModified) / 1000;
	if (difference < 60) {
		const seconds = difference.toFixed(0);
		return `${seconds} s`;
	} else if (difference < 3600) {
		const minutes = (difference / 60).toFixed(0);
		return `${minutes} m`;
	} else if (difference < 86400) {
		const hours = (difference / 3600).toFixed(0);
		return `${hours} h`;
	} else {
		const days = (difference / 86400).toFixed(0);
		return `${days} d`;
	}
};
