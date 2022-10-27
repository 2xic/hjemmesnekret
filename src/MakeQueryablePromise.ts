
// from https://stackoverflow.com/questions/21485545/is-there-a-way-to-tell-if-an-es6-promise-is-fulfilled-rejected-resolved
export function MakeQueryablePromise<T>(promise: Partial<PromiseQuery<T>>): PromiseQuery<T> {
    // Don't create a wrapper for promises that can already be queried.
    if (promise.isFulfilled) return promise as PromiseQuery<T>;
    
    var isResolved = false;
    var isRejected = false;

    // Observe the promise, saving the fulfillment in a closure scope.
    const result: any = (promise as Promise<unknown>).then(
       function(v: unknown) { isResolved = true; return v; }, 
       function(e: unknown) { isRejected = true; throw e; });
    result.isFulfilled = function() { return isResolved || isRejected; };
    result.isResolved = function() { return isResolved; }
    result.isRejected = function() { return isRejected; }
    return result;
}


export interface PromiseQuery<T> extends Promise<T> {
    isFulfilled: () => boolean
}
