function Block() {
    this.val = undefined;
    this.probabilities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.done = false;
}

Block.prototype.val = function(v) {
    if (v === undefined) {
        return this.val();
    }
    if (this.done) {
        throw new Error('Illegal to set value to a Block twice.');
    }
    if (__isLegalVal(v)) {
        this.val = v;
        this.done = true;
        this.probabilities = [];
    } else {
        throw new Error('Invalid data type to set value to a Block.');
    }
};

Block.prototype.hasProb = function(v) {
    return !!~this.probabilities.indexOf(v);
};

Block.prototype.reduceScope = function(v) {
    if (this.done) {
        return;
    }
    if (Array.isArray(v)) {
        for (let i = 0; i < v.length; i++) {
            __removeItem(this.probabilities, v[i]);
        }
    } else if (__isLegalVal(v)) {
        __removeItem(this.probabilities, v);
    }
};

function __isLegalVal(v) {
    return Number.isInteger(v) && v >= 1 && v <= 9;
}

function __removeItem(ls, v) {
    const idx = ls.indexOf(v);
    if (idx < 0) {
        return;
    }
    ls = ls.splice(idx, 1);
}

module.exports = Block;