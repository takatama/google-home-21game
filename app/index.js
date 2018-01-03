

const parseInput = async (maxInputSize, start, input) => {
    const ask = `Please say at most ${maxInputSize} successive numbers starting with ${start}.`;

    if (maxInputSize < 0) {
        throw `Invalid maxInputSize: ${maxInputSize}`;
    }
    if (start < 1) {
        throw `Invalid start: ${start}`;
    }
    if (!input || input.length === 0) {
        throw `Invalid input: ${input}`;
    }

    let i = 0, rest = input, parsed = [];
    while (rest.length > 0) {
        let expected = '' + (start + i);
        let actual = rest.substr(0, expected.length);
        if (actual !== expected) {
            throw `You said invalid number ${actual}. ` + ask;
        }
        rest = rest.substr(actual.length);
        i += 1;
        parsed.push(parseInt(actual, 10));
    }

    if (parsed.length > maxInputSize) {
        throw `You said ${input.length} numbers. ` + ask;
    }

    return parsed;
};

const isLose = (goal, arr) => {
    for (let a of arr) {
        if (a === goal) {
            return true;
        }
    }
    return false;
}

exports.parseInput = parseInput;
exports.isLose = isLose;