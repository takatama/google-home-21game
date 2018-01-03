

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
        throw `${maxInputSize}つ以下で答えてください。`;
    }
    for (let i = 0; i < input.length - 1; i++) {
        if (input[i + 1] - input[i] !== 1) {
            throw `${start} からはじまる ${maxInputSize} つ以下の連続した数を答えてください。`;
        }
    }
    for (let i = 0; i < input.length; i++) {
        if (input[i] !== start + i) {
            throw `${start} からはじまる ${maxInputSize} つ以下の連続した数を答えてください。`;
        }
    }
    return input;
};

exports.validateInput = validateInput;