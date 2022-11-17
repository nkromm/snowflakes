const seedrandom = require('seedrandom');
const rng = seedrandom();

function printSnowflakes(state) {
    // inverted traversal to print line by line in console
    const height = state[0].length;
    for (let index = 0; index < height; index++) {
        const dataOnVisualRow = state.map((x) => x[index]);
        console.log(dataOnVisualRow.map((x) => (x === 0 ? '.' : '*')).join(''));
    }
}

function generateSnowflakes(w, h) {
    const arr = new Array(w);
    for (let outer = 0; outer < w; outer++) {
        arr[outer] = new Array(h);
        for (let inner = 0; inner < h; inner++) {
            arr[outer][inner] = Math.round(rng());
        }
    }
    return arr;
}

// this is the same as the one given as example in the task description
// It doesn't visually align with the image given as I use it inverted
function getExampleSnowflakes() {
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

function passTime(state) {
    const newState = new Array(state.length);
    for (let outer = 0; outer < state.length; outer++) {
        const innerArray = state[outer];
        const zeroesCount = innerArray.filter((x) => x === 0).length;
        const onesCount = innerArray.length - zeroesCount;
        const newColumn = [
            ...new Array(zeroesCount).fill(0),
            ...new Array(onesCount).fill(1),
        ];
        newState[outer] = newColumn;
    }

    return newState;
}

const initialState = generateSnowflakes(9, 5);
// const initialState = getExampleSnowflakes();
const finalState = passTime(initialState);

printSnowflakes(initialState);
console.log();
printSnowflakes(finalState);
