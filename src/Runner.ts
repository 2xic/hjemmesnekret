import glob from 'glob';
require('reflect-metadata');
import path from 'path';
import fs from 'fs';
let { testContainer } = require('./globals')

import dayjs from 'dayjs';
import { HappyLog, SadLog, YellowColorLog } from './Logger';
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

async function runTest(testFile: string) {
  let totalTime = 0;
  const results = [];
  results.push(testFile);

  const start = Date.now();
  // @ts-ignore
  require(testFile);
  results.push(...(await testContainer.run()));
  const end = Date.now();
  totalTime += (end - start) / 1000;
  const testCount = testContainer.testCount;
  const successCount = testContainer.success;
  const failedCount = testContainer.failed;
  const skipCount = testContainer.skip;

  results.push(`Executed ${testContainer.testCount} tests in ${(end - start) / 1000} s`)
  results.push(HappyLog(`${successCount} tests succeeded`))
  results.push(SadLog(`${failedCount} tests failed`))
  results.push(YellowColorLog(`${skipCount} tests skipped`))
  results.push('');
  // Reset the testContainer :)
  testContainer = testContainer.clear();
  return {
    results, testCount,
    successCount,
    failedCount,
    skipCount
  };
}

async function runTests(testFiles: string[]) {
  const start = Date.now();
  const info: string[] = [];
  let totalTestCount = 0;
  let totalSucceededCount = 0;
  let totalFailedCount = 0;
  let totalSkipCount = 0;
  for (const file of testFiles) {
    const { results, testCount, successCount, failedCount, skipCount } = await runTest(file)
    totalTestCount += testCount;
    totalSucceededCount += successCount;
    totalFailedCount += failedCount;
    totalSkipCount += skipCount;
    info.push(...(results));
  }

  console.log(info.join('\n'))

  if (1 < testFiles.length) {
    const end = Date.now();
    console.log(`Executed ${testFiles.length} tests files with ${totalTestCount} test in total`)
    console.log(HappyLog(`${totalSucceededCount} succeeded`))
    console.log(SadLog(`${totalFailedCount} failed`))
    console.log(YellowColorLog(`${totalSkipCount} skipped`))
    console.log(`Total time usage ${end - start} ms `)
  }
}

(async () => {
  let testFile = process.argv.slice(2)[0];
  if (testFile) {
    let isFullPath = fs.existsSync(testFile);
    const files = glob.sync('./**/*.unit.test.js', { absolute: true });
    const foundMatch = files.find((item) => item.includes(testFile));
    testFile = foundMatch ? foundMatch : testFile;

    isFullPath = fs.existsSync(testFile);
    if (!isFullPath) {
      throw new Error(`File not found ${testFile}`)
    }
    await runTests([path.resolve(testFile)]);
  } else {
    const files = glob.sync('./**/*.unit.test.js', { absolute: true });
    await runTests(files);
  }
})()
