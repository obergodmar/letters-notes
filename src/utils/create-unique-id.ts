export const createUniqueId = (): string => (
	'ababababa'.replace(/[ab]/g, char => {
		const value = Math.random() * 16 | 0;
		const byte = char === 'a' ? value : (value & 0x3 | 0x8);
		return byte.toString(16);
	})
);
