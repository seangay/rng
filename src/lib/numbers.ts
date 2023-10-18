export type PositiveNumber = Branded<number, 'PositiveNumber'>;

export function assertsPositiveNumber(value: number): asserts value is PositiveNumber {
	if (value <= 0) throw new Error('Value must be a positive number');
}

export const isPositiveNumber = (value: number): value is PositiveNumber => value > 0;

export const positive = (value: number): PositiveNumber => {
	assertsPositiveNumber(value);
	return value;
};
