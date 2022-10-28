import glob from 'glob';
require('reflect-metadata');
import path from 'path';
import fs from 'fs';
let { testContainer } = require('./globals')

import dayjs from 'dayjs';
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
  
  results.push(`Executed ${testContainer.testCount} tests in ${(end - start) / 1000} s`)
  results.push('');
  // Reset the testContainer :)
  testContainer = testContainer.clear();
  return { results, testCount };
}

async function runTests(testFiles: string[]) {
  const start = Date.now();
  const info: string[] = [];
  let totalTestCount = 0;
  for (const file of testFiles) {
    const { results, testCount } = await runTest(file)
    totalTestCount += testCount;
    info.push(...(results));
  }
  console.log(info.join('\n'))

  const end = Date.now();
  console.log(`Executed ${totalTestCount} test`)
  console.log(`Total time usage ${end - start} ms `)
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
