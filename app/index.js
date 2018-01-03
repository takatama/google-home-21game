

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
};

const turns = ['I', 'You'];

const isMyTurn = (turnIndex) => {
    return turnIndex === 0;
};

const nextTurnIndex = (turnIndex) => {
    return (turnIndex + 1) % turn.length;
}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getMyAnswer = async (goal, maxInputSize, start) => {
    if (start === goal) {
        throw [goal]; // lose
    }
    let len;
    if (goal - start <=  maxInputSize) {
        len = goal - start;
    } else {
        len = getRandomInt(1, maxInputSize);
    }
    let result = [];
    for (let i = 0; i < len; i++) {
        result.push(start + i);
    }
    return result;
};

// const play = (app, turnIndex, goal, maxInputSize, start, input) => {
//     try {
//         const parsed = await parseInput(maxInputSize, start, input);
//         if (isLose(goal, parsed)) {
//             app.tell(`${turns[turnIndex]} lose.`);
//         } else if (isMyTurn(turnIndex)) {
//             const answer = getMyAnswer(goal, maxInputSize, parsed[parsed.length - 1]);
//             if (isLose(goal, answer)) {
//                 app.tell(answer.join(', ') + '. I lose.');
//             }
//             const params = {
//                 turnIndex: turnIndex + 1 % turns.length,
//                 goal: goal, maxInputSize: maxInputSize,
//                 start: answer[answer.length - 1]
//             };
//             app.ask(answer.join(', ') + '.');
//         } else {
//             app.ask();
//         }
//     } catch (e) {
//         app.ask(e);
//     }
// };

exports.parseInput = parseInput;
exports.isLose = isLose;
exports.getMyAnswer = getMyAnswer;