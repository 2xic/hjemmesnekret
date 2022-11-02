import { CallbackFunction } from "../callbackFunction";
import { TestContainer } from "../TestContainer";

export function getBeforeAndAfter(testContainer: TestContainer) {
  const beforeEach = (callback: CallbackFunction) => {
    testContainer.registerBeforeEach(callback);
  };

  const beforeAll = (callback: CallbackFunction) => {
    testContainer.registerBeforeAll(callback);
  };

  const afterAll = (callback: CallbackFunction) => {
    testContainer.registerAfterAll(callback);
  };

  return {
    beforeAll,
    beforeEach,
    afterAll
  };
}
