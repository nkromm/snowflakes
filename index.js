const seedrandom = require('seedrandom');
const rng = seedrandom(); // can pass a seed here

function printSnowflakes(state) {
    const w = state.length;
    const h = state[0].length;

    for (let i = 0; i < w; i++) {
        let line = '';
        for (let j = 0; j < h; j++) {
            const val = state[i][j];
            if (val === -1) line += 'o';
            if (val === 0) line += '.';
            if (val === 1) line += '*';
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
        [0, 1, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, -1, 1, 0, 0, 0, 1, 0, 0],
        [0, -1, 0, 1, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, -1, 0, 0, 0, 0, 0, 0, 0],
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

        let obsIdx = newColumn.findIndex((x) => x === -1);
        let subStartId = 0;
        while (obsIdx >= 0) {
            const sub = newColumn.slice(subStartId, obsIdx);
            if (sub && sub.length > 0) {
                segregatedSub = segregateZeroesAndOnes(sub);
                for (let k = subStartId; k < segregatedSub.length; k++) {
                    newState[k][j] = segregatedSub[k];
                }
            } else {
                newState[subStartId][j] = -1;
            }
            subStartId = obsIdx + 1;
            obsIdx = newColumn.findIndex(
                (x, index) => index >= subStartId + 1 && x === -1
            );
        }
        segregatedColumn = segregateZeroesAndOnes(newColumn);

        for (let k = subStartId; k < segregatedColumn.length; k++) {
            newState[k][j] = segregatedColumn[k];
        }
    }
    return newState;
}

function segregateZeroesAndOnes(col) {
    const zeroCount = col.filter((x) => x === 0).length;
    const onesCount = col.length - zeroCount;
    return [...new Array(zeroCount).fill(0), ...new Array(onesCount).fill(1)];
}

const initialState =
    process.argv.slice(2)[0] === 'fixed'
        ? getExampleSnowflakes()
        : creat2dArray(5, 9, () => Math.round(rng()));

printSnowflakes(initialState);
const finalState = passTime(initialState);
console.log();
printSnowflakes(finalState);
