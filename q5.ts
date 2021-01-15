// 大貧民 〜 横へな 2012.11.9
// http://nabetani.sakura.ne.jp/hena/ord5dahimi/

// 実行方法
// tsc q5.ts && node q5.js

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

function play(openText: string, stockText: string): string {
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

function test(input: string, expected: string) {
    const [openText, stockText] = input.split(',');
    const actual = play(openText, stockText);
    if (sort(expected) === sort(actual)) {
        console.log(`"${input}" got a success`);
    } else {
        console.log(`"${input}" expects "${expected}", but "${actual}"`);    
    }
}

/*#1*/ test( "DJ,", "-" );
/*#2*/ test( "H7,HK", "HK" );
/*#3*/ test( "S3,D4D2", "D4,D2" );
/*#4*/ test( "S9,C8H4", "-" );
/*#5*/ test( "S6,S7STCK", "CK,ST,S7" );
/*#6*/ test( "H4,SAS8CKH6S4", "S8,CK,H6,SA" );
/*#7*/ test( "ST,D6S8JoC7HQHAC2CK", "Jo,C2,CK,HA,HQ" );
/*#8*/ test( "SA,HAD6S8S6D3C4H2C5D4CKHQS7D5", "H2" );
/*#9*/ test( "S2,D8C9D6HQS7H4C6DTS5S6C7HAD4SQ", "-" );
/*#10*/ test( "Jo,HAC8DJSJDTH2", "-" );
/*#11*/ test( "S4Jo,CQS6C9DQH9S2D6S3", "DQCQ,D6S6,H9C9" );
/*#12*/ test( "CTDT,S9C2D9D3JoC6DASJS4", "JoC2,SJJo,DAJo" );
/*#13*/ test( "H3D3,DQS2D6H9HAHTD7S6S7Jo", "JoHA,JoD6,JoH9,D6S6,D7S7,JoS6,HTJo,JoDQ,S2Jo,JoD7,JoS7" );
/*#14*/ test( "D5Jo,CQDAH8C6C9DQH7S2SJCKH5", "CQDQ" );
/*#15*/ test( "C7H7,S7CTH8D5HACQS8JoD6SJS5H4", "HAJo,JoSJ,H8S8,H8Jo,CQJo,CTJo,JoS8" );
/*#16*/ test( "SAHA,S7SKCTS3H9DJHJH7S5H2DKDQS4", "-" );
/*#17*/ test( "JoC8,H6D7C5S9CQH9STDTCAD9S5DAS2CT", "CTDT,H9D9,S9D9,DACA,CTST,H9S9,DTST" );
/*#18*/ test( "HTST,SJHJDJCJJoS3D2", "DJCJ,SJDJ,JoHJ,CJHJ,SJJo,HJSJ,DJJo,JoCJ,JoD2,SJCJ,DJHJ" );
/*#19*/ test( "C7D7,S8D8JoCTDTD4CJ", "D8S8,JoS8,CTJo,DTJo,JoCJ,CTDT,D8Jo" );
/*#20*/ test( "DJSJ,DTDKDQHQJoC2", "JoDK,HQDQ,DQJo,C2Jo,JoHQ" );
/*#21*/ test( "C3H3D3,CKH2DTD5H6S4CJS5C6H5S9CA", "S5H5D5" );
/*#22*/ test( "D8H8S8,CQHJCJJoHQ", "JoCQHQ,JoHJCJ" );
/*#23*/ test( "H6D6S6,H8S8D8C8JoD2H2", "D2H2Jo,D8JoS8,D8S8C8,C8D8H8,JoC8S8,H8JoC8,S8H8C8,JoS8H8,C8JoD8,D8H8S8,D8JoH8" );
/*#24*/ test( "JoD4H4,D3H3S3C3CADASAD2", "DACASA" );
/*#25*/ test( "DJHJSJ,SQDQJoHQCQC2CA", "SQJoCQ,DQCQJo,JoSQHQ,SQCQHQ,DQHQSQ,HQDQCQ,HQDQJo,SQDQCQ,CQJoHQ,SQJoDQ" );
/*#26*/ test( "H3D3Jo,D4SKH6CTS8SAS2CQH4HAC5DADKD9", "HASADA" );
/*#27*/ test( "C3JoH3D3,S2S3H7HQCACTC2CKC6S7H5C7", "-" );
/*#28*/ test( "H5C5S5D5,C7S6D6C3H7HAH6H4C6HQC9", "C6D6S6H6" );
/*#29*/ test( "H7S7C7D7,S5SAH5HAD5DAC5CA", "SADACAHA" );
/*#30*/ test( "D4H4S4C4,S6SAH6HAD6DAC6CAJo", "C6H6S6D6,SAJoDACA,S6H6C6Jo,SACAJoHA,HADASAJo,HADAJoCA,CADAHASA,D6C6JoH6,S6D6C6Jo,H6JoS6D6" );
/*#31*/ test( "DTCTSTHT,S3SQH3HQD3DQC3CQJo", "HQSQJoDQ,SQCQDQJo,DQCQHQJo,SQHQJoCQ,CQDQHQSQ" );
/*#32*/ test( "JoS8D8H8,S9DTH9CTD9STC9CAC2", "H9C9D9S9" );
