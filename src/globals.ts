import {TestContainer} from './TestContainer';
import { MockFunctions } from './utils/MockFunction';
import { spyOn } from './utils/spyOn';
import { useFakeTimers, useRealTime } from './utils/useMockTime';
import { CallbackFunction } from './callbackFunction';
import { getIt } from './scopes/it';
import { getBeforeAndAfter } from './scopes/beforeAndAfter';
import { getExpect } from './scopes/expect';
import { getDescribe } from './scopes/describe';

export const testContainer = new TestContainer();

const {beforeAll, beforeEach, afterAll} = getBeforeAndAfter(testContainer);

global.expect = getExpect();
global.describe = getDescribe(testContainer);
global.beforeEach = beforeEach;
global.beforeAll = beforeAll;
global.afterAll = afterAll;
global.it = getIt(testContainer);
global.test = (name: string, callback: CallbackFunction) => {
  testContainer.addTest(name, callback);
}
global.jest = {
  fn: () => new MockFunctions(),
  useRealTimers: useRealTime,
  useFakeTimers: useFakeTimers,
  spyOn: spyOn,
};
