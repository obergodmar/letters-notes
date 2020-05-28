const names = {
	'ru': {
		s: 'с',
		m: 'м',
		h: 'ч',
		d: 'д'
	},
	'en': {
		s: 's',
		m: 'm',
		h: 'h',
		d: 'd'
	}
};

export const calculateDateDifference = (dateModifiedString: string, language: 'ru' | 'en'): string => {
	const dateModified = new Date(dateModifiedString).getTime();
	const dateNow = new Date().getTime();
	const difference = (dateNow - dateModified) / 1000;

	if (isNaN(difference)) {
		return `0 ${names[language].s}`;
	}

	if (difference < 60) {
		const seconds = difference.toFixed(0);
		return `${seconds} ${names[language].s}`;
	} else if (difference < 3600) {
		const minutes = (difference / 60).toFixed(0);
		return `${minutes} ${names[language].m}`;
	} else if (difference < 86400) {
		const hours = (difference / 3600).toFixed(0);
		return `${hours} ${names[language].h}`;
	} else {
		const days = (difference / 86400).toFixed(0);
		return `${days} ${names[language].d}`;
	}
};
