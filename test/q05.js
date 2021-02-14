const assert = require('assert');
const {play, sort} = require('../q05.js');
const testData = [
    /*#1*/ ["DJ,", "-"],
    /*#2*/ ["H7,HK", "HK"],
    /*#3*/ ["S3,D4D2", "D4,D2"],
    /*#4*/ ["S9,C8H4", "-"],
    /*#5*/ ["S6,S7STCK", "CK,ST,S7"],
    /*#6*/ ["H4,SAS8CKH6S4", "S8,CK,H6,SA"],
    /*#7*/ ["ST,D6S8JoC7HQHAC2CK", "Jo,C2,CK,HA,HQ"],
    /*#8*/ ["SA,HAD6S8S6D3C4H2C5D4CKHQS7D5", "H2"],
    /*#9*/ ["S2,D8C9D6HQS7H4C6DTS5S6C7HAD4SQ", "-"],
    /*#10*/ ["Jo,HAC8DJSJDTH2", "-"],
    /*#11*/ ["S4Jo,CQS6C9DQH9S2D6S3", "DQCQ,D6S6,H9C9"],
    /*#12*/ ["CTDT,S9C2D9D3JoC6DASJS4", "JoC2,SJJo,DAJo"],
    /*#13*/ ["H3D3,DQS2D6H9HAHTD7S6S7Jo", "JoHA,JoD6,JoH9,D6S6,D7S7,JoS6,HTJo,JoDQ,S2Jo,JoD7,JoS7"],
    /*#14*/ ["D5Jo,CQDAH8C6C9DQH7S2SJCKH5", "CQDQ"],
    /*#15*/ ["C7H7,S7CTH8D5HACQS8JoD6SJS5H4", "HAJo,JoSJ,H8S8,H8Jo,CQJo,CTJo,JoS8"],
    /*#16*/ ["SAHA,S7SKCTS3H9DJHJH7S5H2DKDQS4", "-"],
    /*#17*/ ["JoC8,H6D7C5S9CQH9STDTCAD9S5DAS2CT", "CTDT,H9D9,S9D9,DACA,CTST,H9S9,DTST"],
    /*#18*/ ["HTST,SJHJDJCJJoS3D2", "DJCJ,SJDJ,JoHJ,CJHJ,SJJo,HJSJ,DJJo,JoCJ,JoD2,SJCJ,DJHJ"],
    /*#19*/ ["C7D7,S8D8JoCTDTD4CJ", "D8S8,JoS8,CTJo,DTJo,JoCJ,CTDT,D8Jo"],
    /*#20*/ ["DJSJ,DTDKDQHQJoC2", "JoDK,HQDQ,DQJo,C2Jo,JoHQ"],
    /*#21*/ ["C3H3D3,CKH2DTD5H6S4CJS5C6H5S9CA", "S5H5D5"],
    /*#22*/ ["D8H8S8,CQHJCJJoHQ", "JoCQHQ,JoHJCJ"],
    /*#23*/ ["H6D6S6,H8S8D8C8JoD2H2", "D2H2Jo,D8JoS8,D8S8C8,C8D8H8,JoC8S8,H8JoC8,S8H8C8,JoS8H8,C8JoD8,D8H8S8,D8JoH8"],
    /*#24*/ ["JoD4H4,D3H3S3C3CADASAD2", "DACASA"],
    /*#25*/ ["DJHJSJ,SQDQJoHQCQC2CA", "SQJoCQ,DQCQJo,JoSQHQ,SQCQHQ,DQHQSQ,HQDQCQ,HQDQJo,SQDQCQ,CQJoHQ,SQJoDQ"],
    /*#26*/ ["H3D3Jo,D4SKH6CTS8SAS2CQH4HAC5DADKD9", "HASADA"],
    /*#27*/ ["C3JoH3D3,S2S3H7HQCACTC2CKC6S7H5C7", "-"],
    /*#28*/ ["H5C5S5D5,C7S6D6C3H7HAH6H4C6HQC9", "C6D6S6H6"],
    /*#29*/ ["H7S7C7D7,S5SAH5HAD5DAC5CA", "SADACAHA"],
    /*#30*/ ["D4H4S4C4,S6SAH6HAD6DAC6CAJo", "C6H6S6D6,SAJoDACA,S6H6C6Jo,SACAJoHA,HADASAJo,HADAJoCA,CADAHASA,D6C6JoH6,S6D6C6Jo,H6JoS6D6"],
    /*#31*/ ["DTCTSTHT,S3SQH3HQD3DQC3CQJo", "HQSQJoDQ,SQCQDQJo,DQCQHQJo,SQHQJoCQ,CQDQHQSQ"],
    /*#32*/ ["JoS8D8H8,S9DTH9CTD9STC9CAC2", "H9C9D9S9"],
];

describe('play()', function() {
    for (const data of testData) {
        const [input, expected] = data;
        it(`should return "${expected}" when the input is "${input}"`, () => {            
            const actual = play(input);
            assert.strictEqual(sort(actual), sort(expected));
        });
    };
});
