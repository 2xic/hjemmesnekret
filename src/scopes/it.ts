import { CallbackFunction } from "../callbackFunction";
import { MakeCallable } from "../expect/EachEntry";
import { TestContainer } from "../TestContainer";

export function getIt(testContainer: TestContainer) {
  const it = (name: string, callback: CallbackFunction) => {
    testContainer.addTest(name, callback);
  };
  it.skip = (name: string, callback: CallbackFunction) => {
    return testContainer.addTest(name, callback, true);
  };
  (it.skip as any).each = () => {
    return () => undefined;
  };
  it.each = (testOptions: unknown[] | unknown[][]) => {
    return MakeCallable(testOptions, testContainer);
  };

  return it;
}
