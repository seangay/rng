declare const __brand: unique symbol
type Brand<B> = { [__brand]: B }
type Branded<T, B> = T & Brand<B>


export type PositiveNumber = Branded<number, 'PositiveNumber'>;

export function assertsPositiveNumber(value: number): asserts value is PositiveNumber {
    if (value <= 0) throw new Error('Value must be a positive number');
}