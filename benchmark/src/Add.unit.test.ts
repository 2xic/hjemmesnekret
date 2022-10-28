import { Add, AddPromise } from "./Add"

it ('should add number', () => {
    const results = Add({
        a: 4,
        b: 2
    });
    expect(results).toBe(6);
})


it ('should fail if not number', () => {
    const results = Add({
        a: 4,
        b: 2
    });
    expect(results).toBe(3);
})

it ('should add number async', async () => {
    const results = await AddPromise({
        a: 4,
        b: 2
    });
    expect(results).toBe(6);
})
