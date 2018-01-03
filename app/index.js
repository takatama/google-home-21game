'use strict';

const parseInput = (maxInputSize, start, input) => {
    const ask = `Please say at most ${maxInputSize} successive numbers starting with ${start}.`;
    return new Promise((resolve, reject) => {
        if (maxInputSize < 0) {
            return reject(`Invalid maxInputSize: ${maxInputSize}`);
        }
        if (start < 1) {
            return reject(`Invalid start: ${start}`);
        }
        if (!input || input.length === 0) {
            return reject(`Invalid input: ${input}`);
        }

        let i = 0, rest = input, parsed = [];
        while (rest.length > 0) {
            let expected = '' + (start + i);
            let actual = rest.substr(0, expected.length);
            if (actual !== expected) {
                return reject(`You said invalid number ${actual}. ` + ask);
            }
            rest = rest.substr(actual.length);
            i += 1;
            parsed.push(parseInt(actual, 10));
        }

        if (parsed.length > maxInputSize) {
            return reject(`You said ${input.length} numbers. ` + ask);
        }

        resolve(parsed);
    });
};

const isWin = (goal, arr) => {
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
    return (turnIndex + 1) % turns.length;
}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getMyAnswer = (goal, maxInputSize, start) => {
    return new Promise((resolve, reject) => {
        if (start === goal) {
            return reject([goal]); // win
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
        resolve(result);
    });
};

exports.parseInput = parseInput;
exports.isWin = isWin;
exports.getMyAnswer = getMyAnswer;

//process.env.DEBUG = 'actions-on-google:*';
const { DialogflowApp } = require('actions-on-google');
const functions = require('firebase-functions');

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const app = new DialogflowApp({request, response});
    console.log('Request headers: ' + JSON.stringify(request.headers));
    console.log('Request body: ' + JSON.stringify(request.body));
    const COUNTING_CONTEXT = 'counting';

    const save = (app, turnIndex, goal, maxInputSize, start) => {
        const params = {
            turnIndex: turnIndex + 1 % turns.length,
            goal: goal,
            maxInputSize: maxInputSize,
            start: start
        };
        app.setContext(COUNTING_CONTEXT, 99, params);        
    };

    const load = (app) => {
        return app.getContext(COUNTING_CONTEXT).parameters;
    };

    const ask = (app, turnIndex, goal, maxInputSize, start, speech, isFirst) => {
        if (isFirst) {
            speech += `Please say at most ${maxInputSize} successive numbers starting with ${start}. `;            
        }
        save(app, turnIndex, goal, maxInputSize, start);
        app.ask(speech);
    };

    const answer = (app, turnIndex, goal, maxInputSize, start, speech, isFirst) => {
        getMyAnswer(goal, maxInputSize, start).then((ans) => {
            speech += 'I got ' + ans.join(', ') + '. ';
            if (isWin(goal, ans)) {
                app.tell(speech + 'You lose.');
            } else {
                let newStart = ans[ans.length - 1] + 1;
                save(app, turnIndex, goal, maxInputSize, newStart);
                ask(app, turnIndex, goal, maxInputSize, newStart, speech, isFirst);
            }
        }).catch((ans) => {
            app.tell('I got ' + ans.join(', ') + '. You lose.');
        });        
    };

    // Fulfill action business logic
    const welcomeHandler = (app) => {
        const turnIndex = getRandomInt(0, 1);
        const goal = 21;
        const maxInputSize = 3;
        let start = 1;
        let speech = `The object of this game is to be the first one to say ${goal}. `;
        
        if (isMyTurn(turnIndex)) {
            speech += 'My turn. ';
            answer(app, turnIndex, goal, maxInputSize, start, speech, true);
        } else {
            speech += `Your turn.`;
            ask(app, turnIndex, goal, maxInputSize, start, speech, true);
        }
    };

    const numbersHandler = (app) => {
        const p = load(app);
        if (!isMyTurn(p.turnIndex)) {
            parseInput(p.maxInputSize, p.start, p.numbers).then((parsed) => {
                let newStart = parsed[parsed.length - 1] + 1;
                if (isWin(p.goal, parsed)) {
                    app.tell('You win.');
                } else {
                    answer(app, p.turnIndex, p.goal, p.maxInputSize, newStart, '', false);
                }
            }).catch((error) => {
                app.ask(error);
            });
        } else {
            app.tell('error. invalid turn.');
        }
    };

    const actionMap = new Map();
    actionMap.set('input.welcome', welcomeHandler);
    actionMap.set('input.numbers', numbersHandler);

    app.handleRequest(actionMap);
});