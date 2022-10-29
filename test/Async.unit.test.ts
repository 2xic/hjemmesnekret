
describe("async", () => {
  it("should fail async correctly", async () => {
    await expect(new Promise<void>((_, reject) => {
        setTimeout(() => reject(42), 100);
      })).rejects.toBe(42);
  });

  it("should resolve correctly", async () => {
    await expect(new Promise<number>((resolve, _) => {
        setTimeout(() => resolve(42), 100);
      })).resolves.toBe(42);
  });
});
