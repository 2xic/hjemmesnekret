import { CallbackFunction } from "../callbackFunction";
import { TestContainer } from "../TestContainer";


export function getDescribe(testContainer: TestContainer) {
    const describe = (name: string, callback: CallbackFunction) => {
        return testContainer.setup(name, callback);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    describe.skip = (name: string, callback: CallbackFunction) => {};

    return describe;
}