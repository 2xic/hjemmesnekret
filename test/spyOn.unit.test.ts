
describe('spy on', () => {
    it('should spy on math', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(1);
        let number = Math.random();
        expect(number).toBe(1);

        jest.spyOn(global.Math, 'random').mockRestore();
        number = Math.random();
        expect(number).not.toBe(1);
    })
})
