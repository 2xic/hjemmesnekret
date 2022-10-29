import {TestContainer} from './TestContainer';
import {ExpectValue} from './expect/ExpectValue';
import { MakeCallable } from './expect/EachEntry';

export let testContainer = new TestContainer();

export type CallbackFunction = () => void;

export const beforeEach = (callback: CallbackFunction) => {
  testContainer.registerBeforeEach(callback);
};

export const beforeAll = (callback: CallbackFunction) => {
  testContainer.registerBeforeAll(callback);
};

export const it = (name: string, callback: CallbackFunction) => {
  testContainer.addTest(name, callback);
};

export const expect = (value: unknown) => {
  return new ExpectValue(value);
};

export const describe = (name: string, callback: CallbackFunction) => {
    return testContainer.setup(name, callback);
}
describe.skip = (name: string, callback: CallbackFunction) => {
  return testContainer.setup(name, callback, true);
};
global.describe = describe;
global.beforeEach = beforeEach;
global.beforeAll = beforeAll;

it.skip = (name: string, callback: CallbackFunction) => {
  return testContainer.addTest(name, callback, true);
};
(it.skip as any).each = () => {
  return () => undefined;
};
it.each = (testOptions: unknown[] | unknown[][]) => {
  return MakeCallable(testOptions, testContainer);
};

global.it = it;

expect.objectContaining = ExpectValue.objectContaining;
global.expect = expect;
