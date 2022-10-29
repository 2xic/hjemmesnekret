import {TestContainer} from './TestContainer';
import {Expect} from './expect/ExpectValue';
import { MakeCallable } from './expect/EachEntry';

export let testContainer = new TestContainer();

export type CallbackFunction = () => void;

const beforeEach = (callback: CallbackFunction) => {
 // console.log(this);
  testContainer.registerBeforeEach(callback);
};

const beforeAll = (callback: CallbackFunction) => {
  //console.log(this);
  testContainer.registerBeforeAll(callback);
};

export const it = (name: string, callback: CallbackFunction) => {
  // pass
  testContainer.addTest(name, callback);
};

export const expect = (value: unknown) => {
  return new Expect(value);
};

export const describe = (name: string, callback: CallbackFunction) => {
    return testContainer.setup(name, callback);
}

// @ts-ignore
global.describe = describe;
// @ts-ignore
global.describe.skip = (name: string, callback: CallbackFunction) => {
  return testContainer.setup(name, callback, true);
};
// @ts-ignore
global.beforeEach = beforeEach;
// @ts-ignore
global.beforeAll = beforeAll;
// @ts-ignore
global.it = it;
// @ts-ignore
it.skip = (name: string, callback: CallbackFunction) => {
  return testContainer.addTest(name, callback, true);
};
// @ts-ignore
it.skip.each = () => {
  return () => undefined;
};
// @ts-ignore
it.each = (testOptions: unknown[] | unknown[][]) => {
  return MakeCallable(testOptions, testContainer);
//  return () => undefined;
};

// @ts-ignore
global.expect = expect;
// @ts-ignore
global.expect.objectContaining = Expect.objectContaining;
