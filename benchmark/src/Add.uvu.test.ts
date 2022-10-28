import { Add, AddPromise } from "./Add";
import { test } from 'uvu';
import * as assert from 'uvu/assert';

test("should add number", () => {
  const results = Add({
    a: 4,
    b: 2,
  });
  assert.equal(results, 6);
});

test("should fail if not number", () => {
  const results = Add({
    a: 4,
    b: 2,
  });
  assert.equal(results, 3);
});


test('should add number async', async () => {
  const results = await AddPromise({
      a: 4,
      b: 2
  });
  expect(results).toBe(6);
})


test.run();
