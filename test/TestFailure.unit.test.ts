describe("Test", () => {
  it.each([[1], [2]])("should correctly fail %i", (i: number) => {
    expect(i).not.toBe(i);
  });

  it("should fail async correctly", async () => {
    const results = await new Promise<void>((_, reject) => {
      setTimeout(() => reject(42), 100);
    });
    await expect(results).rejects.not.toBe(42);
  });
});
