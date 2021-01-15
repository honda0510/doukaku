// バス代 〜 横へな 2013.4.6
// http://nabetani.sakura.ne.jp/hena/ord9busfare/

// 実行方法
// tsc q9.ts && npm test test/q9.js

function half(num: number): number {
    return Math.ceil(num / 2 / 10) * 10;
}

function sum(numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}

function calcTotalFare(input: string): number {
    const [_normalFare, _passengers] = input.split(':');
    const normalFare = parseInt(_normalFare);
    const passengers = _passengers.split(',');
    const halfFare = half(normalFare);
    const halfFare2 = half(halfFare);
    const adultFares = passengers.filter(p => p.startsWith('A')).map(p => {
        return {'n': normalFare, 'p': 0, 'w': halfFare}[p.slice(-1)];
    });
    const childrenFares = passengers.filter(p => p.startsWith('C')).map(p => {
        return {'n': halfFare, 'p': 0, 'w': halfFare2}[p.slice(-1)];
    });
    const infantFares = passengers.filter(p => p.startsWith('I')).map(p => {
        return {'n': halfFare, 'p': 0, 'w': halfFare2}[p.slice(-1)];
    }).sort((a, b) => b - a);

    for (let i = 0; i < adultFares.length * 2; i++) {
        infantFares.shift();
    }

    return sum(adultFares) + sum(childrenFares) + sum(infantFares);
}

module.exports = calcTotalFare;
