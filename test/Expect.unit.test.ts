
describe('Expect', () => {
	it('should correctly report a failure (fail)', () => {
		expect(2).toBe(4);
	})

	it('should correctly check length', () => {
		expect([1, 2, 3]).toHaveLength(3);
	})


	it('should correctly match object (should fail)', () => {
		expect([1, 2, 3]).toMatchObject(3);
	})

	it('should correctly match toStrictEqual (should fail)', () => {
		expect({a: undefined, b:2}).not.toStrictEqual({b:2});
	})

	it('should correctly resolve async operations (success)', async () => {
		const results = await new Promise((resolve) => {
			setTimeout(() => resolve(42), 3000)
		});
		expect(results).toBe(42);
	})


	it('should correctly reject handle async operations (success)', async () => {
		await expect(new Promise<void>((_, reject) => {
			setTimeout(() => reject(42), 0)
		})).rejects.toBe(42);
	})


	it('should correctly handle async operations', async () => {
		const results = new Promise((resolve) => {
			setTimeout(() => resolve(42), 3000)
		});
		await expect(results).resolves.toBe(42);
	})

	it("should correctly report error", () => {
		expect(() => {
			throw new Error('test')
		}).toThrow();
	})
})
