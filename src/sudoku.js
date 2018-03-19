const Block = require('block'),
    Util = require('util');

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
        this._rows[r] ? this._rows[r].push(tmp) : this._rows[r] = [tmp];
        this._cols[c] ? this._cols[c].push(tmp) : this._cols[c] = [tmp];
        this._sqrs[s] ? this._sqrs[s].push(tmp) : this._sqrs[s] = [tmp];
    }
}

module.exports = Sudoku;