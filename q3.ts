// Y字路巡り 〜 横へな 2012.9.7
// http://nabetani.sakura.ne.jp/hena/ord3ynode/

// 実行方法
// tsc q3.ts --lib es2017,dom && node q3.js

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

function test(input: string, expected: string) {
    const actual = route(input);
    if (expected === actual) {
        console.log(`"${input}" got a success`);
    } else {
        console.log(`"${input}" expects "${expected}", but "${actual}"`);    
    }
}

/*0*/ test("b", "AB")
/*1*/ test("l", "AD")
/*2*/ test("r", "AC")
/*3*/ test("bbb", "ABAB")
/*4*/ test("rrr", "ACBA")
/*5*/ test("blll", "ABCAB")
/*6*/ test("llll", "ADEBA")
/*7*/ test("rbrl", "ACADE")
/*8*/ test("brrrr", "ABEDAB")
/*9*/ test("llrrr", "ADEFDE")
/*10*/ test("lrlll", "ADFEDF")
/*11*/ test("lrrrr", "ADFCAD")
/*12*/ test("rllll", "ACFDAC")
/*13*/ test("blrrrr", "ABCFEBC")
/*14*/ test("brllll", "ABEFCBE")
/*15*/ test("bbrllrrr", "ABACFDEFD")
/*16*/ test("rrrrblll", "ACBACABCA")
/*17*/ test("llrlrrbrb", "ADEFCADABA")
/*18*/ test("rrrbrllrr", "ACBABEFCAD")
/*19*/ test("llrllblrll", "ADEFCBCADEB")
/*20*/ test("lrrlllrbrl", "ADFCBEFDFCB")
/*21*/ test("lllrbrrlbrl", "ADEBCBACFCAB")
/*22*/ test("rrrrrrlrbrl", "ACBACBADFDEB")
/*23*/ test("lbrbbrbrbbrr", "ADABABEBCBCFE")
/*24*/ test("rrrrlbrblllr", "ACBACFCACFDAB")
/*25*/ test("lbbrblrlrlbll", "ADADFDABCFDFED")
/*26*/ test("rrbbrlrlrblrl", "ACBCBADFEBEFDA")
/*27*/ test("blrllblbrrrrll", "ABCFDADEDABEDFE")
/*28*/ test("blrllrlbllrrbr", "ABCFDABCBEFDEDA")
/*29*/ test("lbrbbrllllrblrr", "ADABABEFCBEDEBCF")
/*30*/ test("rrrrbllrlrbrbrr", "ACBACABCFDEDADFC")
