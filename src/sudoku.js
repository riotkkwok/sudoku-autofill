const Block = require('./block'),
    Util = require('./util');

function Sudoku(initLs) {
    if (!Array.isArray(initLs)) {
        throw new Error('Invalid data type to initialize a Sudoku.');
    }

    this._allBlocks = [];
    this._rows = [];
    this._cols = [];
    this._sqrs = [];

    let tmp, r, c, s;
    for (let i = 0; i < 81; i++) {
        tmp = new Block();
        if (Util.isLegalVal(initLs[i])) {
            tmp.val(initLs[i]);
        }
        this._allBlocks.push(tmp);
        r = parseInt(i / 9, 10);
        c = i % 9;
        s = parseInt(r / 3, 10) * 3 + parseInt(c / 3, 10);
        tmp.pos({
            row: r,
            col: c,
            sqr: s
        });
        this._rows[r] ? this._rows[r].push(tmp) : this._rows[r] = [tmp];
        this._cols[c] ? this._cols[c].push(tmp) : this._cols[c] = [tmp];
        this._sqrs[s] ? this._sqrs[s].push(tmp) : this._sqrs[s] = [tmp];
    }

    this.eliminate();
    this.assign();
}

Sudoku.prototype.getRows = function(i) {
    if (i === undefined) {
        return this._rows;
    } else if (Number.isInteger(i)) {
        return this._rows[i];
    } else {
        return null;
    }
};

Sudoku.prototype.getCols = function(i) {
    if (i === undefined) {
        return this._cols;
    } else if (Number.isInteger(i)) {
        return this._cols[i];
    } else {
        return null;
    }
};

Sudoku.prototype.getSqrs = function(i) {
    if (i === undefined) {
        return this._sqrs;
    } else if (Number.isInteger(i)) {
        return this._sqrs[i];
    } else {
        return null;
    }
};

// 根据已确定的数值，减少未定格子的可能性
Sudoku.prototype.eliminate = function() {
    for (let i = 0; i < 81; i++) {
        if (this._allBlocks[i].isDone) {
            this.__cleanProb(this._allBlocks[i].pos(), this._allBlocks[i].val());
        }
    }
};

// 判断格子的可能数值里是否是所在数据块里唯一的
Sudoku.prototype.assign = function() {
    for (let i = 0; i < 81; i++) {
        const blk = this._allBlocks[i];
        if (!blk.isDone) {
            for (let j = 0; j < blk.probabilities.length;j++) {
                const num = blk.probabilities[j],
                    pos = blk.pos();

                checkStructs(this._rows[pos.row], blk, num);
                checkStructs(this._cols[pos.col], blk, num);
                checkStructs(this._sqrs[pos.sqr], blk, num);
            }
        }
    }

    function checkStructs(ls, bk, v) {
        let k, rs;
        for (k = 0, rs = 1; k < 9; k++) {
            if (ls[k].hasProb(v)) {
                rs = 0;
                break;
            }
        }
        if (rs === 1) {
            bk.val(v, 'S-assign');
            this.__cleanProb(bk.pos(), bk.val());
        }
    }
};

Sudoku.prototype.exclude = function() {
    for (let i = 0; i < 9; i++) {
        let rl = this._rows[i],
            cl = this._cols[i],
            sl = this._sqrs[i];
        // TODO
    }
};

// {rows index, cols index, sqrs index}, value
// 根据给定的数值v，清除对应的行row、列col和九宫格sqr里面的格子的可能值
Sudoku.prototype.__cleanProb = function({row, col, sqr}, v) {
    const rl = this._rows[row],
        cl = this._cols[col],
        sl = this._sqrs[sqr];
    for (let i = 0; i < 9; i++) {
        let rr = rl[i].reduceScope(v),
            cr = cl[i].reduceScope(v),
            sr = sl[i].reduceScope(v);
        if (rr === 1) {
            this.__cleanProb(rl[i].pos(), rl[i].val());
        }
        if (cr === 1) {
            this.__cleanProb(cl[i].pos(), cl[i].val());
        }
        if (sr === 1) {
            this.__cleanProb(sl[i].pos(), sl[i].val());
        }
    }
};

module.exports = Sudoku;