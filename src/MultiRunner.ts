import glob from 'glob';
const { spawn } = require('node:child_process');
import path from 'path';
import { MakeQueryablePromise, PromiseQuery } from './MakeQueryablePromise';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

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
  let queue: PromiseQuery<string>[] = [];
  const start = Date.now();
  while (files.length){
    const size = Math.min(workerCount, files.length);

    while(queue.length < size) {
      queue.push(MakeQueryablePromise<string>(Worker(files.pop() as string)))
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
