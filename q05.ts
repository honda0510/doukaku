// 大貧民 〜 横へな 2012.11.9
// http://nabetani.sakura.ne.jp/hena/ord5dahimi/

// 実行方法
// tsc q05.ts && npm test test/q05.js

function split(text: string): string[] {
    const result: string[] = [];
    for (let i = 0; i < text.length; i += 2) {
        result.push(text.slice(i, i + 2));
    }
    return result;
}

function isJoker(card: string): boolean {
    return card === 'Jo';
}

function rank(card: string): number {
    return '3456789TJQKA2o'.indexOf(card.slice(-1));
}

function combine(cards: string[], baseCards: string[], times: number, index = 1): string[] {
    if (index >= times) {
        return cards;
    }

    const newCards = [];
    cards.forEach(card => {
        baseCards.forEach(baseCard => {
            newCards.push(card + baseCard)
        });
    });

    return combine(newCards, baseCards, times, index + 1);
}

function filter(groups: string[]): string[] {
    const results = groups.map(split).filter(cards => {
        const found = cards.find(card => !isJoker(card));
        const cardRank = rank(found || cards[0]);
        return cards.every(card => {
            // 同じ数字でなく、ジョーカーでもなければ除外
            if (rank(card) !== cardRank && !isJoker(card)) {
                return false;
            }
            // 同じカードが複数含まれていたら除外
            if (cards.filter(_card => _card === card).length > 1) {
                return false;
            }
            return true;
        });
    });

    // 重複を除外して返す
    return results.reduce((_results, cards) => {
        const cardsText = cards.sort().join('');
        if (!_results.includes(cardsText)) {
            _results.push(cardsText);
        }
        return _results;
    }, []);
}

function play(input: string): string {
    const [openText, stockText] = input.split(',');
    const openCards = split(openText);
    const openNum = openCards.length;
    const ranks = openNum === 1
        ? openCards.map(rank)
        : openCards.filter(card => !isJoker(card)).map(rank);
    const openRank = Math.max(...ranks);
    const stockCards = split(stockText);
    const candidates = stockCards.filter(card => rank(card) > openRank);
    const groups = combine(candidates, candidates, openNum);
    const result = filter(groups);
    return result.length === 0 ? '-' : result.join(',');
}

function sort(text: string): string {
    const cards = text.split(',').map(cardsText => {
        if (cardsText === '-') {
            return cardsText;
        } else {
            return split(cardsText).sort().join('');
        }
    })
    return cards.sort().join('');
}

module.exports.play = play;
module.exports.sort = sort;
