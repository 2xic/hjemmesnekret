import { strictEqual } from "../src/utils/strictEqual";

describe('strict equal', () => {
    it('should correctly report strict equal', () => {
        expect(strictEqual({a: undefined, b:2}, {b:2})).toBe(false);
    })
})
