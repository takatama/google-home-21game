

const validateInput = async (maxInputSize, start, input) => {
    if (maxInputSize < 0) {
        throw `Invalid maxInputSize: ${maxInputSize}`;
    }
    if (start < 1) {
        throw `Invalid start: ${start}`;
    }
    if (!input || input.length === 0) {
        throw `Invalid input: ${input}`;
    }
    if (input.length > maxInputSize) {
        throw `You said ${input.length} numbers. Please say at most ${maxInputSize} numbers.`;
    }
    for (let i = 0; i < input.length - 1; i++) {
        if (input[i + 1] - input[i] !== 1) {
            throw `${input[i + 1]} is not successive. Please say at most ${maxInputSize} successive numbers starting with ${start}.`;
        }
    }
    if (input[0] !== start) {
        throw `You said numbers starting with ${input[0]}. Please say at most ${maxInputSize} successive numbers starting with ${start}.`;
    }
    return input;
};

exports.validateInput = validateInput;