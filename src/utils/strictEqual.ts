
export function strictEqual(a: unknown, b: unknown): boolean {
    if(typeof a === typeof b) {
        if (typeof a === 'object' && typeof b === 'object') {
            if (a === null || b === null) {
                return a === b;
            }
            const keysA = Object.keys(a);
            const keysB = Object.keys(b);
            const entries = keysA;

            if (keysA.length === keysB.length) {
                return false;
            }

            return entries.every((key) => {
                const valueA = a[key as keyof Object];
                const valueB = b[key as keyof Object];

                if (typeof valueA === 'object') {
                    return strictEqual(valueA, valueB)
                } else {
                    return valueA === valueB;
                }
            })
        } else if (typeof a === 'number' || typeof a === 'string') {
            return a === b;
        } else {
            throw new Error('unknown type')
        }
    } else if (a === undefined || a === null) {
        return a === b;
    } else {
        return false;
    }
}
