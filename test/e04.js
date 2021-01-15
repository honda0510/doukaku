const assert = require('assert');
const Mountain = require('../e04.js');
const testData = [
    /*0*/ ["2512:C", "DEFGH"],
    /*1*/ ["1:A", "CDEFGH"],
    /*2*/ [":C", "ABDEFGH"],
    /*3*/ ["2345:B", "AGH"],
    /*4*/ ["1256:E", "ABCDH"],
    /*5*/ ["1228:A", "ADEFG"],
    /*6*/ ["5623:B", "AEFGH"],
    /*7*/ ["8157:C", "ABDEFGH"],
    /*8*/ ["74767:E", "ABCFGH"],
    /*9*/ ["88717:D", "ABCEFGH"],
    /*10*/ ["148647:A", "ACDEFH"],
    /*11*/ ["374258:H", "BCDEFH"],
    /*12*/ ["6647768:F", "ABCDEH"],
    /*13*/ ["4786317:E", "ABFGH"],
    /*14*/ ["3456781:C", ""],
    /*15*/ ["225721686547123:C", "CEF"],
    /*16*/ ["2765356148824666:F", "ABCDEH"],
    /*17*/ ["42318287535641783:F", "BDE"],
    /*18*/ ["584423584751745261:D", "FGH"],
    /*19*/ ["8811873415472513884:D", "CFG"],
    /*20*/ ["74817442725737422451:H", "BCDEF"],
    /*21*/ ["223188865746766511566:C", "ABGH"],
    /*22*/ ["2763666483242552567747:F", "ABCG"],
    /*23*/ ["76724442325377753577138:E", "EG"],
    /*24*/ ["327328486656448784712618:B", ""],
    /*25*/ ["4884637666662548114774288:D", "DGH"],
    /*26*/ ["84226765313786654637511248:H", "DEF"],
    /*27*/ ["486142154163288126476238756:A", "CDF"],
    /*28*/ ["1836275732415226326155464567:F", "BCD"],
    /*29*/ ["62544434452376661746517374245:G", "G"],
    /*30*/ ["381352782758218463842725673473:B", "A"],
];

describe('Mountain', function() {
    const climbers = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    for (const data of testData) {
        const [input, expected] = data;
        it(`should return "${expected}" when the input is "${input}"`, () => {            
            const mount = new Mountain(input);
            const actual = climbers.filter(c => mount.climb(c)).join('');
            assert.strictEqual(actual, expected);
        });
    };
});
