import { describe, it, expect } from 'vitest';

import { assertsPositiveNumber, isPositiveNumber } from './numbers';

describe('isPositiveNumber', () => {
	it('should return true for positive numbers', () => {
		expect(isPositiveNumber(1)).toBe(true);
		expect(isPositiveNumber(100)).toBe(true);
		expect(isPositiveNumber(0.1)).toBe(true);
	});

	it('should return false for negative numbers', () => {
		expect(isPositiveNumber(-1)).toBe(false);
		expect(isPositiveNumber(-100)).toBe(false);
		expect(isPositiveNumber(-0.1)).toBe(false);
	});

	it('should return false for zero', () => {
		expect(isPositiveNumber(0)).toBe(false);
	});
});

it('test assertsPositiveNumber', () => {
	expect(() => assertsPositiveNumber(-1)).toThrow();
	expect(() => assertsPositiveNumber(0)).toThrow();
	expect(() => assertsPositiveNumber(1));
});
