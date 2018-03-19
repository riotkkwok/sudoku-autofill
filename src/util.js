module.exports = {
    isLegalVal: function(v) {
        return Number.isInteger(v) && v >= 1 && v <= 9;
    },
    removeItem: function (ls, v) {
        const idx = ls.indexOf(v);
        if (idx < 0) {
            return;
        }
        ls.splice(idx, 1);
    }
};