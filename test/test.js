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
            assert.equal(error, '3つ以下で答えてください。');
        });
    });

    it('should reject when the input is not successive.', () => {
        return numberCounting.validateInput(3, 1, [1, 2, 4]).catch((error) => {
            assert.equal(error, '1 からはじまる 3 つ以下の連続した数を答えてください。');
        });
    });

    it('should reject when the input is not start with start number.', () => {
        return numberCounting.validateInput(3, 2, [1, 2, 3]).catch((error) => {
            assert.equal(error, '2 からはじまる 3 つ以下の連続した数を答えてください。');
        });
    });

});
