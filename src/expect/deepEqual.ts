/* eslint-disable @typescript-eslint/ban-types */

export function deepEqual(a: unknown, b: unknown): boolean {
    if (a && typeof a === 'object' && b && typeof b === 'object') {
        const keys_a = Object.keys(a);
        const keys_b = Object.keys(b)

        return keys_a.length === keys_b.length && Object.keys(a).every((key) => {
            return deepEqual(a[key as keyof Object], b[key as keyof Object])
        })
    } else {
        return typeof a === typeof b && a == b;
    }
}