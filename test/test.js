const assert = require('assert');
const numberCounting = require('../app/index.js');

describe('#parseInput()', () => {
    it('should resolve when the input 1, 2, 3 is valid.', () => {
        return numberCounting.parseInput(3, 1, '123').then((input) => {
            assert.deepEqual(input, [1, 2, 3]);
        });
    });

    it('should resolve when the input 8, 9, 10 is valid.', () => {
        return numberCounting.parseInput(3, 8, '8910').then((input) => {
            assert.deepEqual(input, [8, 9, 10]);
        });
    });

    it('should resolve when the input 9, 10 is valid.', () => {
        return numberCounting.parseInput(3, 9, '910').then((input) => {
            assert.deepEqual(input, [9, 10]);
        });
    });

    it('should resolve when the input 98, 99, 100 is valid.', () => {
        return numberCounting.parseInput(3, 98, '9899100').then((input) => {
            assert.deepEqual(input, [98, 99, 100]);
        });
    });

    it('should reject when the input exceeds max input size.', () => {
        return numberCounting.parseInput(3, 1, '1234').catch((error) => {
            assert.equal(error, 'You said 4 numbers. Please say at most 3 successive numbers starting with 1.');
        });
    });

    it('should reject when the input is not successive.', () => {
        return numberCounting.parseInput(3, 1, '134').catch((error) => {
            assert.equal(error, 'You said invalid number 3. Please say at most 3 successive numbers starting with 1.');
        });
    });

    it('should reject when the input does not start with the start number.', () => {
        return numberCounting.parseInput(3, 2, '123').catch((error) => {
            assert.equal(error, 'You said invalid number 1. Please say at most 3 successive numbers starting with 2.');
        });
    });
});
