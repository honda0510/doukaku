// ドキドキ登山
// http://mtsmfm.github.io/2016/06/04/doukaku-e04.html

// 実行方法
// tsc e04.ts && npm test test/e04.js

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

module.exports = Mountain;
