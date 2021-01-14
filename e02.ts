// ぴったり含む長方形 横へな2016.3.5 問題
// http://nabetani.sakura.ne.jp/hena/orde02pire/

// 実行方法
// tsc e02.ts --target es2019 --lib es2019,dom && node e02.js

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

function calcMinMaxAreas(n: number, blacks: string[]): string {
    const minRects = calcMinRects(n, blacks);
    if (minRects.length === 0) {
        return '-';
    }
    const coordinates = blacks.map(alnumToCoordinate);
    const maxRects = minRects.map(rect => rect.maximize(coordinates));
    const minArea = minRects.reduce((a, b) => a.area < b.area ? a : b).area
    const maxArea = maxRects.reduce((a, b) => a.area > b.area ? a : b).area
    return `${minArea},${maxArea}`;
}

function test(input: string, expected: string) {
    const [n, blacksText] = input.split(':');
    const actual = calcMinMaxAreas(parseInt(n), blacksText.split(','));
    if (expected === actual) {
        console.log(`"${input}" got a success`);
    } else {
        console.log(`"${input}" expects "${expected}", but "${actual}"`);
    }
}

console.log(new Date().toTimeString());
// const result = combine('ABCDEF'.split(''), 4);
// console.log(result);
// const result = combine('Ic,Dk,Ef,6R,GK,NZ,76,L0,oQ,9f,S3,oL,lX,7v,8d,pX,dZ,z7,zx,fR,pe,w7,aj,U9,lO,kv,wL,s0'.split(','), 9);
// const result = combine('JJ,LR,Xe,kg,LU,lI,3w,ZV,Td,Mu,tA,g8,VC,I7,N8,zN,kY,Ux,3t,mg,4m,FO,Ug,vQ,qY,jl,Ne,Zq,GN'.split(','), 10);
// const result = combine('lQ,EN,vO,tn,qO,F3,9k,K2,UC,P0,XY,DB,QO,ps,hy,fl,Dt,ex,Vc,vF,Pf,Vk,uo,Xc,Sh,KE,9g,3H,l6'.split(','), 11);
// console.log(result.length);
/*0*/ test( "3:Oh,Be,AF,in,eG,ir,l5,Q8,mC,7T,Ty,tT", "108,1920" );
/*1*/ test( "3:00,zz,0z,z0", "-" );
/*2*/ test( "1:ho", "1,3844" );
/*3*/ test( "2:am", "-" );
/*4*/ test( "4:00,zz,0z,z0", "3844,3844" );
/*5*/ test( "4:00,11,zz,yy,1y,y1", "3600,3721" );
/*6*/ test( "2:00,01,10,11,yz,zy,yy,zz", "2,3660" );
/*7*/ test( "2:AA,AB,BA,BB,SZ,SY,TZ,TY", "2,2046" );
/*8*/ test( "3:Lw,qw,cw,Ow,2w,fw,yw,ow,Zw,iw", "7,2170" );
/*9*/ test( "4:0o,0s,0x,0C,0L,0k,0V,0y,0m,0S", "9,2852" );
/*10*/ test( "5:Tz,gz,Ez,Pz,3z,Jz,iz,Bz,ez,9z", "17,2604" );
/*11*/ test( "6:mQ,mp,mv,mW,mo,mZ,mC,mc,mt,mH", "23,3100" );
/*12*/ test( "5:a0,a4,aa,ac,ag,aB,aG,aK,aO,aY,az", "19,2480" );
/*13*/ test( "10:Ep,Jx,Qh,M7,Zr,lk,yp,Ya,aW,J3,OJ", "1938,3720" );
/*14*/ test( "5:00,01,10,0y,0z,1z,y0,z0,z1,yz,zz,zy", "3721,3721" );
/*15*/ test( "7:00,01,10,0y,0z,1z,y0,z0,z1,yz,zz,zy", "-" );
/*16*/ test( "8:00,01,10,0y,0z,1z,y0,z0,z1,yz,zz,zy,TE", "-" );
/*17*/ test( "11:bU,cl,d5,Fn,NW,gA,2O,YU,H4,0y,qE,Hd,ZH", "1748,3658" );
/*18*/ test( "12:SM,cf,AD,6P,cm,mo,if,s0,Mt,GJ,9m,Sp,lA,x4,NE", "1806,3186" );
/*19*/ test( "2:00,I0,c0,z0,0I,II,cI,zI,0c,Ic,cc,zc,0z,Iz,cz,zz", "19,2520" );
/*20*/ test( "3:00,I0,c0,z0,0I,II,cI,zI,0c,Ic,cc,zc,0z,Iz,cz,zz", "39,2562" );
/*21*/ test( "5:00,I0,c0,z0,0I,II,cI,zI,0c,Ic,cc,zc,0z,Iz,cz,zz", "-" );
/*22*/ test( "6:00,I0,c0,z0,0I,II,cI,zI,0c,Ic,cc,zc,0z,Iz,cz,zz", "741,3660" );
/*23*/ test( "7:00,I0,c0,z0,0I,II,cI,zI,0c,Ic,cc,zc,0z,Iz,cz,zz", "-" );
/*24*/ test( "7:00,I0,c0,z0,0I,II,cJ,zI,0c,Ic,cc,zc,0z,Iz,cz,zz", "1178,2623" );
/*25*/ test( "13:Lk,y3,uO,Gk,sF,7y,ED,FP,rK,vw,Lo,kT,ib,MR,sC,Cu,xQ", "1794,3472" );
/*26*/ test( "1:lz,en,81,M2,M1,8p,7m,ND,m0,gd,3v,hr,hA,Yr,XB,x2,AR,5Q,3V,B3", "1,1785" );
/*27*/ test( "2:s1,Dx,yu,H8,c4,6C,95,FK,xV,Q7,h2,Wk,BI,i0,bl,9Q,KF,1q,52,PS,Jh", "6,1824" );
/*28*/ test( "2:0R,20,fz,0a,0X,zp,P0,0b,0S,zw,e0,0G,g0,06,a0,Zz,zW,zn,00,z6,zq,U0", "2,3660" );
/*29*/ test( "3:H5,jF,AT,HH,k7,Ho,Mz,07,Tt,Sq,Zh,Yt,e5,oS,qf,YY,JD,bP,s4,hB,TC,PW", "28,1224" );
/*30*/ test( "4:oe,pg,Np,zP,ho,pe,OV,S0,oM,wO,pM,Ah,Vq,9d,6U,3I,C9,AR,1L,rg,69,as,Nx", "12,1989" );
/*31*/ test( "2:n0,V0,zL,i0,4z,Nz,xz,z0,z1,0f,P0,zw,80,zC,zB,Az,0P,50,k0,rz,0D,jz,qz,E0", "2,2928" );
/*32*/ test( "2:tz,0F,0y,zo,0K,01,qz,zU,gz,Xz,zc,0m,zD,Q0,Yz,zb,0a,zp,zW,z7,0o,h0,1z,0p", "2,3660" );
/*33*/ test( "5:8r,NI,gL,3z,EK,hy,L9,g2,Kh,Gw,Dg,ZB,Sg,LY,ig,sS,I8,U0,DI,cq,Bu,qJ,C4,jP", "143,1520" );
/*34*/ test( "2:7s,z7,so,zw,X2,59,r1,0Q,70,q2,C6,J6,wz,at,2w,Vq,f9,st,sI,rf,wG,zg,f3,L2,4j", "4,2340" );
/*35*/ test( "2:kw,Gz,zp,se,8e,2S,C7,1A,B9,5v,AM,sN,zH,m8,Cx,rG,4w,q2,W0,ta,AC,G5,y0,Vq,3i", "4,2080" );
/*36*/ test( "3:Lr,pX,y7,2Y,qI,6w,t5,R6,e8,57,5f,R1,Up,9q,33,1Z,05,Eu,6S,AW,au,7S,zd,CA,R7", "7,2120" );
/*37*/ test( "3:ut,0C,6p,5w,9M,uj,I6,sq,Yr,Tz,Bp,p7,Rt,JB,6O,Bw,T1,tY,pn,MA,7I,GC,BO,m0,ts", "12,2016" );
/*38*/ test( "4:sE,Wy,Oo,uY,4t,os,B1,xq,4j,ex,s7,y7,54,ud,Cj,0L,S7,fx,11,cs,zc,tn,S6,Zq,2r", "56,2400" );
/*39*/ test( "6:eZ,5V,xT,2x,W7,vy,yT,8R,XT,4c,yX,s9,3E,KZ,tp,Sj,Su,wp,4F,BV,aC,qw,cJ,Gl,aA", "192,1849" );
/*40*/ test( "7:6Q,av,UZ,0c,IV,fo,Vv,mg,no,qM,06,zy,jW,R0,Qo,sK,wQ,1b,De,Iy,zI,cx,rn,ot,cN,45", "250,2303" );
/*41*/ test( "4:0A,15,5k,Bi,mz,0f,vr,EZ,4z,vj,6p,vP,8X,16,x7,S3,2z,zJ,wI,wY,Wv,ky,9K,8u,Eo,4s,y0", "48,2700" );
/*42*/ test( "8:zN,2J,ta,HL,Dg,up,Qn,W8,8K,k4,Is,uL,dT,tA,PN,UQ,DB,gA,OO,lv,4h,Rv,D6,23,Tg,4S,Zb", "418,1763" );
/*43*/ test( "5:px,sp,cr,dB,fz,65,gq,zb,sN,42,o0,y3,iE,pv,sn,Al,RE,48,l0,7X,DE,xL,wC,qQ,w5,C3,P3,i1", "102,2397" );
/*44*/ test( "9:Ic,Dk,Ef,6R,GK,NZ,76,L0,oQ,9f,S3,oL,lX,7v,8d,pX,dZ,z7,zx,fR,pe,w7,aj,U9,lO,kv,wL,s0", "396,2088" );
/*45*/ test( "10:JJ,LR,Xe,kg,LU,lI,3w,ZV,Td,Mu,tA,g8,VC,I7,N8,zN,kY,Ux,3t,mg,4m,FO,Ug,vQ,qY,jl,Ne,Zq,GN", "416,1794" );
/*46*/ test( "11:lQ,EN,vO,tn,qO,F3,9k,K2,UC,P0,XY,DB,QO,ps,hy,fl,Dt,ex,Vc,vF,Pf,Vk,uo,Xc,Sh,KE,9g,3H,l6", "658,1995" );
console.log(new Date().toTimeString());
