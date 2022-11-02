## Hjemmesnekret

(Simple) proof of concept testing framework created to profile against other tests frameworks. 

It's not a real test runner, and missing nice features like. Test diffing, and nice error messages. It also does not have a real stacktrace with support for things like js.map.

[jest-light-runner](https://www.npmjs.com/package/jest-light-runner) seems to be the way to go if you want a fast jest-compatible api.

# Speed vs jest
Here is the time difference for running all tests in [tinyeth](https://github.com/2xic/tinyeth) between jest, hjemmesnekret, and jest-light.

Jest uses cacheing, and that's why the time used decreases a lot after the first run for jest.

![results](plot-data/plot.png)

# Speed vs other testing frameworks
I also tried to use [vitest](https://vitest.dev/), but was not able to get it to run on tinyeth (I got sefaults, and did not get a helpful error message). 

Uvu was also fast, but does not have a jest compatible api, so it was not tested with tinyeth.

These were however tested in the `benchmark` folder.
