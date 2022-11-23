const seedrandom = require('seedrandom');
const rng = seedrandom(); // can pass a seed here

function printSnowflakes(state) {
    const w = state.length;
    const h = state[0].length;

    for (let i = 0; i < w; i++) {
        let line = '';
        for (let j = 0; j < h; j++) {
            line += state[i][j] === 0 ? '.' : '*';
        }
        console.log(line);
    }
}

function creat2dArray(w, h, fill) {
    const arr = new Array(w);
    for (let outer = 0; outer < w; outer++) {
        arr[outer] = new Array(h);
        for (let inner = 0; inner < h; inner++) {
            arr[outer][inner] = fill ? fill() : null;
        }
    }
    return arr;
}

function getExampleSnowflakes() {
    return [
        [0, 0, 0, 1, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
}

function passTime(state) {
    const w = state.length;
    const h = state[0].length;
    const newState = creat2dArray(w, h);

    for (let j = 0; j < h; j++) {
        const newColumn = new Array(w);
        for (let i = 0; i < w; i++) {
            newColumn[i] = state[i][j];
        }

        const zeroCount = newColumn.filter((x) => x === 0).length;
        const onesCount = newColumn.length - zeroCount;
        const sortedColumn = [
            ...new Array(zeroCount).fill(0),
            ...new Array(onesCount).fill(1),
        ];

        for (let k = 0; k < sortedColumn.length; k++) {
            newState[k][j] = sortedColumn[k];
        }
    }
    return newState;
}

const initialState =
    process.argv.slice(2)[0] === 'fixed'
        ? getExampleSnowflakes()
        : creat2dArray(5, 9, () => Math.round(rng()));

printSnowflakes(initialState);
const finalState = passTime(initialState);
console.log();
printSnowflakes(finalState);
