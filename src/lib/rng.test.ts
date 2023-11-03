import { describe, it, expect } from 'vitest';
import { randomNumbers } from './rng';
import { positive } from './numbers';

describe('randomNumbers test', () => {
	it('returns an array of unique numbers', () => {
		const max = 10;
		const numbers = randomNumbers(positive(max));
		expect(numbers).toHaveLength(max);
		expect(new Set(numbers)).toHaveLength(max);
	});
});
