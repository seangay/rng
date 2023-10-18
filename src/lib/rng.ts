import type { PositiveNumber } from './numbers';

export const createRng = (max: PositiveNumber) => {
	const numbers = Array.from({ length: max }, (_, index) => index + 1);

	let idx = 0;

	for (let i = max - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[numbers[i], numbers[j]] = [numbers[j], numbers[i]];
	}

	return {
		getNextRandomNumber: () => {
			if (idx >= numbers.length) {
				throw new Error('We ran out of numbers');
			}
			return numbers[idx++];
		}
	};
};
