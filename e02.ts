// ぴったり含む長方形 横へな2016.3.5 問題
// http://nabetani.sakura.ne.jp/hena/orde02pire/

// 実行方法
// tsc e02.ts --target es2019 && npm test test/e02.js

const ALNUMS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

interface Coordinate {
    x: number;
    y: number;
}

class Rect {
    x1: number;
    y1: number;
    x2: number;
    y2: number;

    constructor(x1: number, y1: number, x2: number, y2: number) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    get area(): number {
        const width = this.x2 - this.x1 + 1;
        const height = this.y2 - this.y1 + 1;
        return width * height;
    }

    count(coordinates: Coordinate[]): number {
        const {x1, x2, y1, y2} = this;
        const targets = coordinates.filter(coordinate => {
            const {x, y} = coordinate;
            return x >= x1 && x <= x2 && y >= y1 && y <= y2
        });
        return targets.length;
    }

    maximize(coordinates: Coordinate[]): Rect {
        const {x1, y1, x2, y2} = this;    
        const lefts = coordinates.filter(c => c.x < x1).map(c => c.x + 1);
        const tops = coordinates.filter(c => c.y < y1).map(c => c.y + 1);
        const rights = coordinates.filter(c => c.x > x2).map(c => c.x - 1);
        const bottoms = coordinates.filter(c => c.y > y2).map(c => c.y - 1);
        lefts.push(0);
        tops.push(0);
        rights.push(ALNUMS.length - 1);
        bottoms.push(ALNUMS.length - 1);
        const rects = [];
    
        for (const left of lefts) {
            for (const top of tops) {
                for (const right of rights) {
                    for (const bottom of bottoms) {
                        rects.push(new Rect(left, top, right, bottom));
                    }
                }
            }
        }
    
        const thisN = this.count(coordinates);
        const maxRect = rects
            .filter(rect => rect.count(coordinates) === thisN)
            .reduce((a, b) => a.area > b.area ? a : b);
    
        return maxRect;
    }
}

// function combine(list: string[], n: number): string[][] {
//     if (list.length < n) {
//         return [];
//     }
//     if (n < 2) {
//         return list.map(v => [v]);
//     }

//     return list.reduce((results, head, i) => {
//         const tails = combine(list.slice(i + 1), n - 1);
//         tails.forEach(tail => {
//             tail.unshift(head);
//             results.push(tail);
//         });
//         return results;
//     }, []);
// }

function* combine(list: string[], n: number) {
    const len = list.length;
    const indexes = [];
    for (let i = 0; i < n; i++) {
        indexes.push(i);
    }
    const lastPos = n - 1;

    while (indexes[0] + n <= len) {
        while (indexes[lastPos] < len) {
            yield indexes.map(i => list[i])
            indexes[lastPos]++;
        }

        for (let pos = lastPos - 1; pos >= 0; pos--) {
            indexes[pos]++;
            const lastIdx = indexes[pos] + (lastPos - pos);
            if (lastIdx < len) {
                for (; pos + 1 < n; pos++) {
                    indexes[pos + 1] = indexes[pos] + 1;
                }
                break;
            }
        }
    }
}

function alnumToCoordinate(alnum: string): Coordinate {
    const x = ALNUMS.indexOf(alnum[0]);
    const y = ALNUMS.indexOf(alnum[1]);
    return {x, y};
}

function coordinatesToRect(cs: Coordinate[]): Rect {
    const xs = cs.map(c => c.x);
    const ys = cs.map(c => c.y);
    const x1 = Math.min(...xs);
    const y1 = Math.min(...ys);
    const x2 = Math.max(...xs);
    const y2 = Math.max(...ys);
    return new Rect(x1, y1, x2, y2);
}

function calcMinRects(n: number, blacks: string[]): Rect[] {
    const rects = [];
    const _blacks = blacks.map(alnumToCoordinate);
    for (const combi of combine(blacks, n)) {
        const coordinates = combi.map(alnumToCoordinate);
        const rect = coordinatesToRect(coordinates);
        if (rect.count(_blacks) === n) {
            rects.push(rect);
        }
    }
    return rects;
}

function calcMinMaxAreas(input: string): string {
    const [n, blacksText] = input.split(':');
    const blacks = blacksText.split(',');
    const minRects = calcMinRects(parseInt(n), blacks);
    if (minRects.length === 0) {
        return '-';
    }
    const coordinates = blacks.map(alnumToCoordinate);
    const maxRects = minRects.map(rect => rect.maximize(coordinates));
    const minArea = minRects.reduce((a, b) => a.area < b.area ? a : b).area
    const maxArea = maxRects.reduce((a, b) => a.area > b.area ? a : b).area
    return `${minArea},${maxArea}`;
}

module.exports = calcMinMaxAreas;
