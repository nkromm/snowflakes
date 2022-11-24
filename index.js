const seedrandom = require('seedrandom');
const rng = seedrandom(); // could pass a seed here

const W = 60;
const H = 30;
const delay = 50;
const fillChance = 0.5;
const emptyCharacters = [' ', '.']
const snowflakeCharacters = ['*', '+', '@', '#', '$', 'm']
const emptySymbol = emptyCharacters[(Math.round(rng() * 10)) % emptyCharacters.length];
const snowflakeSymbol = snowflakeCharacters[(Math.round(rng() * 10)) % snowflakeCharacters.length];

(async function () {
    const useFixedCase = process.argv.slice(2)[0] === 'fixed';
    const initialState = useFixedCase
        ? getExampleTable()
        : createRandomTable(W, H, fillChance);
    let currentState = initialState;
    print(currentState);

    for (let i = 0; i < W; i++) {
        currentState = getTableNextState(currentState);

        await sleep(delay);
        print(currentState);
    }
})();

function getTableNextState(state) {
    const newState = new Array(state.length);
    for (let outer = 0; outer < state.length; outer++) {
        newState[outer] = getColumnNextState([...state[outer]]);
    }

    return newState;
}

function getColumnNextState(arr) {
    const length = arr.length;
    const isZero = (i) => arr[i] === 0;
    const isOne = (i) => arr[i] === 1;
    const moveOne = (i, k) => {
        if (i !== k && arr[k] === 0) {
            arr[k] = 1;
            arr[i] = 0;
        }
    };

    let lastZeroIndex = length - 1;
    let lastOneIndex = length - 1;

    for (let i = length - 2; i >= 0; i--) {
        if (isZero(i)) {
            if (lastOneIndex === i + 1) {
                moveOne(lastOneIndex, lastZeroIndex);
            }
            lastZeroIndex = i;
        }

        if (isOne(i)) {
            lastOneIndex = i;
            if (i === 0) {
                moveOne(0, lastZeroIndex);
            }
        }
    }

    return arr;
}

// this is the same as the one given as example in the task description
// It doesn't visually align with the image given as I use it inverted
function getExampleTable() {
    return [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ];
}

function createRandomTable(w, h, fillPercentage = 0.3) {
    console.log(`Generating random snowflakes ${w}x${h}`);
    const arr = new Array(w);
    for (let outer = 0; outer < w; outer++) {
        arr[outer] = new Array(h);
        for (let inner = 0; inner < h; inner++) {
            // fill based on percentage for a more scarcely populated table
            if (Math.random() < fillPercentage) {
                arr[outer][inner] = Math.round(rng());
            } else {
                arr[outer][inner] = 0;
            }
        }
    }
    return arr;
}

function print(state) {
    console.clear();
    const height = state[0].length;
    const horizontalFrame = `+${new Array(state.length).fill('-').join('')}+`;
    const visual = [];

    visual.push(horizontalFrame);
    for (let index = 0; index < height; index++) {
        const dataOnVisualRow = state.map((x) => x[index]);
        visual.push(
            `|${dataOnVisualRow
                .map((x) => (x === 0 ? emptySymbol : snowflakeSymbol))
                .join('')}|`
        );
    }
    visual.push(horizontalFrame);
    console.log('Let it snow! :D');
    console.log(visual.join('\n'));
}

function sleep(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}
