import { describe, it, expect } from 'vitest';
import { createRng } from './rng';
import { assertsPositiveNumber } from './branded';

describe('createRng test', () => {
	it('Can get uniques', () => {
		const max = 10; //<-- 

    assertsPositiveNumber(max);

		const rng = createRng(max);

		for (let i = 0; i < max; i++) {
		  	rng.getNextRandomNumber();
		}
		expect(() => rng.getNextRandomNumber(), 'Number should throw').toThrow('We ran out of numbers');
	});

  it('test assertsPositiveNumber', () => {
    expect(()=>assertsPositiveNumber(-1)).toThrow()
    expect(()=>assertsPositiveNumber(0)).toThrow()
    expect(()=>assertsPositiveNumber(1));
  })
});
