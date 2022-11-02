import { ExpectValue } from "../expect/ExpectValue";


export function getExpect() {
    const expect = (value: unknown) => {
        return new ExpectValue(value);
    };
    expect.objectContaining = ExpectValue.objectContaining;

    return expect;
}