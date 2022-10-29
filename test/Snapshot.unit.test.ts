import { Snapshot } from "../src/Snapshot";

describe('snapshots', () => {
    it.skip('should run snapshot correctly', () => {
        expect(new Snapshot().construct({
            a: 42,
            b: 300,
        }).trim()).toBe(`
          Object {
            "a": 42,
            "b": 300
          }
        `.trim());
    })

    it.skip('should correctly verify snapshot', () => {
        expect({
            a: 42,
            b: 300,
        }).toMatchInlineSnapshot(`
        Object {
          "a": 42,
          "b": 300,
        }
      `);
    });
});