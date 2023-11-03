import type { PositiveNumber } from './numbers';


export const randomNumbers = (max: PositiveNumber) => {
	const numbers = Array.from({ length: max }, (_, index) => index + 1);
	for (let i = max - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[numbers[i], numbers[j]] = [numbers[j], numbers[i]];
	}
	return numbers
};


export const createRng = (max: PositiveNumber) => {
	let idx = 0;

	const numbers = randomNumbers(max)

	return {
		getNextRandomNumber: () => {
			if (idx >= numbers.length) {
				throw new Error('We ran out of numbers');
			}
			return numbers[idx++];
		}
	};
};
