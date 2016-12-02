'use strict'

const isClass= require('./utils.js').isClass;
const classof= require('./utils.js').classof;
const isSameClass= require('./utils.js').isSameClass;
const path = require('path');
const FS = require('q-io/fs');


module.exports.rule = function(file) {
    const item = path.join(file.dir, file.name) + '.json';
    FS.read(item)
        .then(data => JSON.parse(data))
        .then(data => _data2rule(data))
        .then(data => _writeRule(path.join(file.dir, file.name), data))
        .fail(err => console.error(err))
}

const _data2rule = function (data) {
    if(Array.isArray(data)) {
        data.length = 1;
        _data2rule(data[0]);
    }
    else if(typeof data === 'object') {
        var keys = Object.keys(data),
            i = 0;
        for(; i<keys.length; i++) {
            _data2rule(data[keys[i]]);
        }
    }
    return data;
}

const _writeRule = function (dir, data) {
    const rulePath = dir + '_rules.json';
    const targetRule = data;
    FS.exists(rulePath)
        .then(isExists => {
            if(!isExists) {
                FS.write(rulePath, JSON.stringify(data, null, 4));
            }
            else {
                FS.read(rulePath)
                    .then(data => JSON.parse(data))
                    .then(originRule => _diff(originRule, targetRule))
                    .then(rule => FS.write(rulePath, JSON.stringify(rule, null, 4)))
                    .fail(err => console.log(err));
            }
        })
        .fail(err => console.log(err));
}

const _diff = function(o, t) {
    if(isClass(t, 'Array')) {
        if(isClass(o, 'Array')) {
            t = [_diff(o[0], t[0])];
        }
    }
    if(isClass(t, 'Object')) {
        const realKeys = Object.keys(o).map(item => {
            return item.split('|')[0];
        })

        for(let prop in t) {
            const index = realKeys.indexOf(prop);
            const key = Object.keys(o)[index];
            if(index > -1) {
                if(classof(t[prop]) !== classof(o[key])) {
                    continue;
                }
                else if (typeof t[prop] === 'object') {
                    const tempValue = _diff(o[key], t[prop]);
                    if(JSON.stringify(t[prop]) === JSON.stringify(tempValue)) {
                        delete t[prop];
                        t[key] = tempValue;
                    }
                }
                else if(isSameClass(o[key], t[prop])) {
                    delete t[prop];
                    t[key] = o[key];
                }
            }
        }
        return t;
    }
    return t;
}

module.exports.diff = _diff;
