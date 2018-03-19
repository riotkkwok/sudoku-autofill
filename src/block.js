const Util = require('util');

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
}

Block.prototype.val = function(v) {
    if (v === undefined) {
        return this.val();
    }
    if (this.done) {
        throw new Error('Illegal to set value to a Block twice.');
    }
    if (Util.isLegalVal(v)) {
        this.value = v;
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
            Util.removeItem(this.probabilities, v[i]);
        }
    } else if (Util.isLegalVal(v)) {
        Util.removeItem(this.probabilities, v);
    }
};

module.exports = Block;