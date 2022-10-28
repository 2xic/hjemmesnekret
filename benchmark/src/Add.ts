

export function Add({a, b}: {a: number, b: number}) {
    return a + b;
}

export async function AddPromise({a, b}: {a: number, b: number}) {
    await new Promise((resolve) => setTimeout(resolve, 5000))
    return a + b;
}
