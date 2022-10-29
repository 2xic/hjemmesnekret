/* eslint-disable @typescript-eslint/ban-types */
import { FailedTestError } from "../expect/FailedTestError";

/*
    TODO: Parse the stack trace
        -> The error is thrown in our code
        -> But the stack trace will return to the original code.
        -> should also map with js.map to support typescript
*/
export class SimpleStackTracer {
    constructor(private error: Error | Object) {}


    public getMeaningFullStackTrace() {
        if (this.error instanceof FailedTestError) {
            // TODO: in the future add the trace here.
            return this.error.message;
        } else {
            return this.error;
        }
    }
}
