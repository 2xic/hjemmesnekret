import glob from 'glob';
const { spawn } = require('node:child_process');
import path from 'path';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// from https://stackoverflow.com/questions/21485545/is-there-a-way-to-tell-if-an-es6-promise-is-fulfilled-rejected-resolved
function MakeQueryablePromise(promise: any): PromiseQuery {
    // Don't create a wrapper for promises that can already be queried.
    if (promise.isResolved) return promise;
    
    var isResolved = false;
    var isRejected = false;

    // Observe the promise, saving the fulfillment in a closure scope.
    var result = promise.then(
       function(v: unknown) { isResolved = true; return v; }, 
       function(e: unknown) { isRejected = true; /*throw e;*/ })
      .catch(() => {isRejected = true})
    result.isFulfilled = function() { return isResolved || isRejected; };
    result.isResolved = function() { return isResolved; }
    result.isRejected = function() { return isRejected; }
    return result;
}

async function Worker(file: string) {
  return new Promise<string>((resolve, reject) => {
    const TestContainerRunnerPath = path.join(__dirname, 'TestContainerRunner.js');
    const ls = spawn('node', [TestContainerRunnerPath, file]);


    let globalData = '';

    ls.stdout.on('data', (data: unknown) => {
 //     console.log(`stdout: ${data}`);
      globalData += data;
    });

    ls.stderr.on('data', (data: unknown) => {
//      console.error(`stderr: ${data}`);
//      reject(data);
    });

    ls.on('close', (code: unknown) => {
     // console.log(`child process exited with code ${code}`);
      if (code == 0) {
        resolve(globalData);
      } else{
        //console.log(globalData)
        reject();
      }
    });
  })
}

(async () => {
  const workerCount = 2;
  const files = glob.sync('./**/*.unit.test.js', {absolute: true});
  let queue: PromiseQuery[] = [];
  const start = Date.now();
  while (files.length){
    const size = Math.min(workerCount, files.length);

    while(queue.length < size) {
      queue.push(MakeQueryablePromise(Worker(files.pop() as string)))
    }
    // clear done items
    queue = queue.filter((item) => {
      if (item.isFulfilled()){
        console.log(item);
        return false;
      }
      return true;
    })

    await sleep(10);
  }
  const end = Date.now();
  console.log(`time usage ${end - start} ms`)
})();

interface PromiseQuery {
  isFulfilled: () => boolean
}