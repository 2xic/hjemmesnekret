import glob from "glob";
require("reflect-metadata");
import path from "path";
import fs from "fs";
import {testContainer } from "./globals";

import dayjs from "dayjs";
import { HappyLog, SadLog, YellowColorLog } from "./utils/Logger";
import { Failure } from "./TestContainer";
import { SimpleStackTracer } from "./utils/StackTracer";
import './utils/useMockTime';

import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const dateNowUnhooked = Date.now;

async function runTest(testFile: string) {
  const results = [];
  results.push(testFile);

  // console.log(`Test file ${testFile}`);

  const start = dateNowUnhooked();
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    require(testFile);
  } catch(err){
    console.log(`Loading test failed ${err}`)
  }
  try {
    results.push(...(await testContainer.run().catch((err: unknown) => {
      console.log(err);
      return [];
    })));
  } catch (err){
    console.log(`error running test ${err}`)
  }
  const end = dateNowUnhooked();

  const testCount = testContainer.testCount;
  const successCount = testContainer.success;
  const failedCount = testContainer.failed;
  const skipCount = testContainer.skip;
  const failures: [string, Failure[]] = [testFile, [...testContainer.failures]];

  results.push(
    `Executed ${testContainer.testCount} tests in ${(end - start) / 1000} s`
  );
  results.push(HappyLog(`${successCount} tests succeeded`));
  results.push(SadLog(`${failedCount} tests failed`));
  results.push(YellowColorLog(`${skipCount} tests skipped`));
  results.push("");

  // Reset the testContainer :)
  testContainer.clear();
  return {
    results,
    testCount,
    successCount,
    failedCount,
    skipCount,
    failures,
  };
}

async function runTests(testFiles: string[]) {
  const start = dateNowUnhooked();
  const info: string[] = [];
  let totalTestCount = 0;
  let totalSucceededCount = 0;
  let totalFailedCount = 0;
  let totalSkipCount = 0;
  const allFailures: Array<[string, Failure[]]> = [];
  for (const file of testFiles) {
    const {
      results,
      testCount,
      successCount,
      failedCount,
      skipCount,
      failures,
    } = await runTest(file);
    totalTestCount += testCount;
    totalSucceededCount += successCount;
    totalFailedCount += failedCount;
    totalSkipCount += skipCount;
    info.push(...results);
    allFailures.push(failures);
  }

  console.log(info.join("\n"));

  for (const [name, errors] of allFailures) {
    if (errors.length) {
      console.log(name);
    }
    errors.forEach(({ context, message }) => {
      console.log(`\t${context.join("->")}`);
      console.log(
        `\t\t${new SimpleStackTracer(message).getMeaningFullStackTrace()}`
      );
      console.log();
    });
  }

  if (1 < testFiles.length) {
    const end = dateNowUnhooked();
    console.log(
      `Executed ${testFiles.length} tests files with ${totalTestCount} test in total`
    );
    console.log(HappyLog(`${totalSucceededCount} succeeded`));
    console.log(SadLog(`${totalFailedCount} failed`));
    console.log(YellowColorLog(`${totalSkipCount} skipped`));
    console.log(`Total time usage ${end - start} ms `);
  }
}

(async () => {
  let testFile = process.argv.slice(2)[0];
  if (testFile) {
    let isFullPath = fs.existsSync(testFile);
    const files = glob.sync("./**/*.unit.test.js", { absolute: true });
    const foundMatch = files.find((item) => item.includes(testFile));
    testFile = foundMatch ? foundMatch : testFile;

    isFullPath = fs.existsSync(testFile);
    if (!isFullPath) {
      throw new Error(`File not found ${testFile}`);
    }
    await runTests([path.resolve(testFile)]);
  } else {
    const files = glob.sync("./**/*.unit.test.js", { absolute: true });
    await runTests(files);
  }
})();
