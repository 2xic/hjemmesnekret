import { deepEqual } from "../src/deepEqual";

describe('deep equal', () => {

    it('should correctly report when not equal', () => {
        const results = deepEqual({ a: 2 }, { b: 4 });
        expect(results).toBe(false)
    })

    it('should correctly report when equal', () => {
        const results = deepEqual({ a: 2 }, { a: 2 });
        expect(results).toBe(true)
    })

    it('should correctly report an array is equal', () => {
        const results = deepEqual([1, 2, 3], [1, 2, 3]);
        expect(results).toBe(true)
    })

    it('should correctly report an array is not equal', () => {
        const results = deepEqual([1, 2, 3], [1, 2, 3, 4]);
        expect(results).toBe(false)
    })
})
