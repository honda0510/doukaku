const ALL_CLIMBERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const DIRECTION_MAP = [undefined, 'AB', 'BC', 'CD', 'DE', 'EF', 'FG', 'GH', 'HA'];

class Mountain {
    private paths: string[];
    private rock_paths: number[] = [];
    private loser: string;

    constructor(path_text: string) {
        // 2512:C
        const directions = path_text.slice(0, -2).split('');
        // BC,EF,AB,BC
        this.paths = directions.map(dir => {
            return DIRECTION_MAP[parseInt(dir)];
        });
        const rock = path_text.slice(-1);
        this.loser = this.paths.reduce((loser, path, i) => {
            const idx = path.indexOf(loser);
            if (idx === -1) {
                return loser;
            } else {
                this.rock_paths.push(i);
                return idx === 0 ? path[1] : path[0];
            }
        }, rock);
    }

    climb(climber: string): boolean {
        if (this.loser === climber) {
            return false;
        }
        // BC,EF,AB,BC
        const climber_paths = []
        this.paths.reduceRight((pos, path, i) => {
            const idx = path.indexOf(pos);
            if (idx === -1) {
                return pos;
            } else {
                climber_paths.push(i);
                return idx === 0 ? path[1] : path[0];
            }
        }, climber);
        return climber_paths.every(path => {
            return this.rock_paths.indexOf(path) === -1;
        });
    }
}

function test(input, expected) {
    const mount = new Mountain(input);
    const climbers = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].filter(climber => {
        return mount.climb(climber);
    });
    const actual = climbers.join('');
    if (expected === actual) {
        console.log(`"${input}" got a success`);
    } else {
        console.log(`"${input}" expects "${expected}", but "${actual}"`);
    }
}

/*0*/ test("2512:C", "DEFGH")
/*1*/ test("1:A", "CDEFGH")
/*2*/ test(":C", "ABDEFGH")
/*3*/ test("2345:B", "AGH")
/*4*/ test("1256:E", "ABCDH")
/*5*/ test("1228:A", "ADEFG")
/*6*/ test("5623:B", "AEFGH")
/*7*/ test("8157:C", "ABDEFGH")
/*8*/ test("74767:E", "ABCFGH")
/*9*/ test("88717:D", "ABCEFGH")
/*10*/ test("148647:A", "ACDEFH")
/*11*/ test("374258:H", "BCDEFH")
/*12*/ test("6647768:F", "ABCDEH")
/*13*/ test("4786317:E", "ABFGH")
/*14*/ test("3456781:C", "")
/*15*/ test("225721686547123:C", "CEF")
/*16*/ test("2765356148824666:F", "ABCDEH")
/*17*/ test("42318287535641783:F", "BDE")
/*18*/ test("584423584751745261:D", "FGH")
/*19*/ test("8811873415472513884:D", "CFG")
/*20*/ test("74817442725737422451:H", "BCDEF")
/*21*/ test("223188865746766511566:C", "ABGH")
/*22*/ test("2763666483242552567747:F", "ABCG")
/*23*/ test("76724442325377753577138:E", "EG")
/*24*/ test("327328486656448784712618:B", "")
/*25*/ test("4884637666662548114774288:D", "DGH")
/*26*/ test("84226765313786654637511248:H", "DEF")
/*27*/ test("486142154163288126476238756:A", "CDF")
/*28*/ test("1836275732415226326155464567:F", "BCD")
/*29*/ test("62544434452376661746517374245:G", "G")
/*30*/ test("381352782758218463842725673473:B", "A")
