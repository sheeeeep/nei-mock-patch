function classof(o) {
    return  Object.prototype.toString.call(o).slice(8, -1)
}


module.exports.isClass = function(o, type) {
    return classof(o) === type;
}

module.exports.isSameClass = function(o1, o2) {
    return classof(o1) === classof(o2);
}

module.exports.classof= classof;
