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

describe('#isLose()', () => {
    it('should not lose when the input has not the goal number.', () => {
        assert.equal(numberCounting.isLose(21, [1, 2, 3]), false);
    });

    it('should lose when the input has the goal number.', () => {
        assert.equal(numberCounting.isLose(21, [20, 21]), true);
    });
});

describe('#getMyAnswer()', () => {
    it('should reject when the start number is same as the goal.', () => {
        return numberCounting.getMyAnswer(21, 3, 21).catch((answer) => {
            assert.deepEqual(answer, [21]);
        });
    });

    it('should not say the goal when start number equals goal minus 1.', () => {
        return numberCounting.getMyAnswer(21, 3, 20).then((answer) => {
            assert.deepEqual(answer, [20]);
        });
    });

    it('should not say the goal when start number equals goal minus 2.', () => {
        return numberCounting.getMyAnswer(21, 3, 19).then((answer) => {
            assert.deepEqual(answer, [19, 20]);
        });
    });

    it('should not say the goal when start number equals goal minus 3.', () => {
        return numberCounting.getMyAnswer(21, 3, 18).then((answer) => {
            assert.deepEqual(answer, [18, 19, 20]);
        });
    });

    it('should say at most 3 numbers.', () => {
        return numberCounting.getMyAnswer(21, 3, 18).then((answer) => {
            let len = answer.length;
            assert.equal(0 < len && len < 4, true);
        });        
    });
});
