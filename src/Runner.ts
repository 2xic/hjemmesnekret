import glob from 'glob';
import {TestContainer} from './TestContainer';
import {Expect} from './ExpectValue';
import { MakeCallable } from './EachEntry';
require('reflect-metadata');

import dayjs from 'dayjs';
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);


let testContainer = new TestContainer();

type CallbackFunction = () => void;

const beforeEach = (callback: CallbackFunction) => {
 // console.log(this);
  testContainer.registerBeforeEach(callback);
};

const beforAll = (callback: CallbackFunction) => {
  //console.log(this);
  testContainer.registerBeforeAll(callback);
};

const it = (name: string, callback: CallbackFunction) => {
  // pass
  testContainer.addTest(name, callback);
};

const expect = (value: unknown) => {
  return new Expect(value);
};

const describe = (name: string, callback: CallbackFunction) => {
    return testContainer.setup(name, callback);
}

// @ts-ignore
global.describe = describe;
// @ts-ignore
global.describe.skip = () => undefined;
// @ts-ignore
global.beforeEach = beforeEach;
// @ts-ignore
global.beforeAll = beforAll;
// @ts-ignore
global.it = it;
// @ts-ignore
global.it.skip = () => undefined;
// @ts-ignore
global.it.skip.each = () => {
  return () => undefined;
};
// @ts-ignore
global.it.each = (testOptions: unknown[] | unknown[][]) => {
  return MakeCallable(testOptions, testContainer);
//  return () => undefined;
};

// @ts-ignore
global.expect = expect;
// @ts-ignore
global.expect.objectContaining = Expect.objectContaining;


async function runTest(testFile: string) {
  let totalTime = 0;
  const results = [];
  results.push(testFile);

  // @ts-ignore
  require(testFile);
  const start = Date.now();
  results.push(...(await testContainer.run()));
  const end = Date.now();
  totalTime += (end-start)/ 1000;
  results.push(`Time ${(end-start) / 1000} s (total ${totalTime})`)
  // Reset the testContainer :)
  testContainer = new TestContainer();
  return results;
}

(async () => {
  const testFile = process.argv.slice(2)[0];
  if (testFile) {
    runTest(testFile);
  } else {
    const start = Date.now();
    const files = glob.sync('./**/*.unit.test.js', {absolute: true});
    const info: string[] = [];
    for (const file of files) {
      info.push(...(await runTest(file)));
    }
    console.log(info.join('\n'))

    const end = Date.now();
    console.log(`total time usage ${end - start} ms`)
  }
})()
