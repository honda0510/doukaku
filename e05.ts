// どきどきトロッコ 横へな2016.7.2 問題
// http://nabetani.sakura.ne.jp/hena/orde05dokitruck/

// 実行方法
// tsc e05.ts && npm test test/e05.js

const BRANCHES = [
    [[0, 1], [1, 2], [2]],
    [[0, 2], [1], [1, 2]],
    [[0, 2], [0, 1], [2]],
    [[0], [0, 1], [1, 2]],
    [[0], [1, 2], [0, 2]],
    [[0, 1], [1], [0, 2]],
    [[0], [], [2]],
    [[], [1], [2]],
    [[0], [1], []]
];

class Truck {
    courses: number[][][];
    len: number;

    constructor(input: string) {
        this.courses = input.split('').map(n => BRANCHES[parseInt(n) - 1]);
        this.len = this.courses.length;
    }

    goDown(line: number, i  = 0) {
        if (i >= this.len) {
            return true;
        }
        const lines = this.courses[i][line];
        return lines.some(line2 => this.goDown(line2, i + 1));
    }
}

function goDown(input: string) {
    const truck = new Truck(input);
    const list = ['a', 'b', 'c'].reduce((list, sign, i) => {
        if (truck.goDown(i)) {
            list.push(sign);
        }
        return list;
    }, []);
    return list.length === 0 ? '-': list.join('');
}

module.exports = goDown;
