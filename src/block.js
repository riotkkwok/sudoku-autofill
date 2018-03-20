const Util = require('./util');

function Block(v) {
    if (Util.isLegalVal(v)) {
        this.value = v;
        this.probabilities = [];
        this.done = true;
        this.condition = true;
    } else {
        this.value = undefined;
        this.probabilities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.done = false;
        this.condition = false;
    }
    this.position = {
        row: -1,
        col: -1,
        sqr: -1,
    };
    this.handler = '';
}

Block.prototype.val = function(v, h) {
    if (v === undefined) {
        return this.value;
    }
    if (this.done) {
        throw new Error('Illegal to set value to a Block twice.');
    }
    if (Util.isLegalVal(v)) {
        this.value = v;
        this.done = true;
        this.probabilities = [];
        this.handler = h;
    } else {
        throw new Error('Invalid data type to set value to a Block.');
    }
};

Block.prototype.hasProb = function(v) {
    return !!~this.probabilities.indexOf(v);
};

Block.prototype.reduceScope = function(v) {
    if (this.done) {
        return -1;
    }
    if (Array.isArray(v)) {
        for (let i = 0; i < v.length; i++) {
            Util.removeItem(this.probabilities, v[i]);
        }
    } else if (Util.isLegalVal(v)) {
        Util.removeItem(this.probabilities, v);
    }

    if (this.probabilities.length === 1) {
        this.val(this.probabilities[0], 'B-reduceScope');
        return 1;
    } else {
        return 0;
    }
};

Block.prototype.pos = function(p) {
    if (p === undefined) {
        return this.position;
    }
    if (typeof p === 'object' && Number.isInteger(p.row) && Number.isInteger(p.col) && Number.isInteger(p.sqr)) {
        this.position.row = p.row;
        this.position.col = p.col;
        this.position.sqr = p.sqr;
    } else {
        throw new Error('Invalid data type to set value to the \'position\' of a Block.');
    }
};

Block.prototype.isDone = function() {
    return this.done;
};

Block.prototype.isCondition = function() {
    return this.condition;
};

module.exports = Block;