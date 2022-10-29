import { Expect } from "../src/expect/ExpectValue"
import { FailedTestError } from "../src/expect/FailedTestError"


describe('Expect', () => {
    it('should correctly give readable feedback', () => {
        expect(() => new Expect(42).toBe(2)).toEqual(new FailedTestError('Expected 42 to be 2'))
    })
})