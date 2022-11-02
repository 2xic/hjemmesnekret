
export class MockFunctions {
    private calldata: unknown[] = [];

    private default: unknown;

    public mockResolvedValueOnce(response: unknown | Promise<unknown>) {
        this.calldata.push(Promise.resolve(response));
        return this;
    }

    public mockResolvedValue(response: unknown | Promise<unknown>) {
        this.default = Promise.resolve(response);
        return this;
    }
}
