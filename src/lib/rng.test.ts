import { describe, it, expect } from 'vitest';
import { createRng } from './rng';
import { positive } from './numbers';

describe('createRng test', () => {
	it('Can get uniques', () => {
		const max = 10;

		const rng = createRng(positive(max));

		for (let i = 0; i < max; i++) {
			rng.getNextRandomNumber();
		}
		expect(() => rng.getNextRandomNumber(), 'Number should throw').toThrow('We ran out of numbers');
	});
});
