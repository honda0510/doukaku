// Y字路巡り 〜 横へな 2012.9.7
// http://nabetani.sakura.ne.jp/hena/ord3ynode/

// 実行方法
// tsc q3.ts && npm test test/q3.js

const MAP = {
    'AB': {'r': 'E', 'l': 'C', 'b': 'A'},
    'AC': {'r': 'B', 'l': 'F', 'b': 'A'},
    'AD': {'r': 'F', 'l': 'E', 'b': 'A'},
    'BA': {'r': 'C', 'l': 'D', 'b': 'B'},
    'BC': {'r': 'F', 'l': 'A', 'b': 'B'},
    'BE': {'r': 'D', 'l': 'F', 'b': 'B'},
    'CA': {'r': 'D', 'l': 'B', 'b': 'C'},
    'CB': {'r': 'A', 'l': 'E', 'b': 'C'},
    'CF': {'r': 'E', 'l': 'D', 'b': 'C'},
    'DA': {'r': 'B', 'l': 'C', 'b': 'D'},
    'DE': {'r': 'F', 'l': 'B', 'b': 'D'},
    'DF': {'r': 'C', 'l': 'E', 'b': 'D'},
    'EB': {'r': 'C', 'l': 'A', 'b': 'E'},
    'ED': {'r': 'A', 'l': 'F', 'b': 'E'},
    'EF': {'r': 'D', 'l': 'C', 'b': 'E'},
    'FC': {'r': 'A', 'l': 'B', 'b': 'F'},
    'FD': {'r': 'E', 'l': 'A', 'b': 'F'},
    'FE': {'r': 'B', 'l': 'D', 'b': 'F'},
};

function route(instructions: string): string {
    let from = 'B';
    let to = 'A';
    const paths = [to];
    const n = instructions.length;
    for (let i = 0; i < n; i++) {
        const inst = instructions[i];
        const next = MAP[`${from}${to}`][inst];
        paths.push(next);
        from = to;
        to = next;
    }
    return paths.join('');
}

module.exports = route;
