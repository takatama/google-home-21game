const assert = require('assert');
const numberCounting = require('../app/index.js');

describe('#isValid()', () => {
    it('should resolve when the input is valid.', () => {
        return numberCounting.validateInput(3, 1, [1, 2, 3]).then((input) => {
            assert.deepEqual(input, [1, 2, 3]);
        });
    });

    it('should reject when the input exceeds max input size.', () => {
        return numberCounting.validateInput(3, 1, [1, 2, 3, 4]).catch((error) => {
            assert.equal(error, 'You said 4 numbers. Please say at most 3 numbers.');
        });
    });

    it('should reject when the input is not successive.', () => {
        return numberCounting.validateInput(3, 1, [1, 2, 4]).catch((error) => {
            assert.equal(error, '4 is not successive. Please say at most 3 successive numbers starting with 1.');
        });
    });

    it('should reject when the input is not start with start number.', () => {
        return numberCounting.validateInput(3, 2, [1, 2, 3]).catch((error) => {
            assert.equal(error, 'You said numbers starting with 1. Please say at most 3 successive numbers starting with 2.');
        });
    });

});
