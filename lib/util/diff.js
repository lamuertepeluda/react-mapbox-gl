"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reduce = require('reduce-object');
var find = function (obj, predicate) { return (Object.keys(obj).filter(function (key) { return predicate(obj[key], key); })[0]); };
var diff = function (obj1, obj2) { return (reduce(obj2, function (res, value, key) {
    var toMutate = res;
    if (find(obj1, function (v, k) { return key === k && value !== v; })) {
        toMutate[key] = value;
    }
    return toMutate;
}, {})); };
exports.default = diff;
//# sourceMappingURL=diff.js.map