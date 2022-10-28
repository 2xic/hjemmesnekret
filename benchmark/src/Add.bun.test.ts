import { expect, test } from "bun:test";
import { Add } from "./Add";

test ('should add number', () => {
    const results = Add({
        a: 4,
        b: 2
    });
    expect(results).toBe(6);
})


test ('should fail if not number', () => {
    const results = Add({
        a: 4,
        b: 2
    });
    expect(results).toBe(3);
})
