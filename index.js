'use strict';

const FS = require('q-io/fs');
const fs = require('fs');
const path = require('path');

const rule = require('./rule.js').rule;
const mock = require('./mock.js').mock;
const reset = require('./reset.js').reset;

const action = process.argv[2];
const dest = process.argv[3];

const rootPath= fs.realpathSync('.') + '/mock/views' // 获取根目录
const pathFileObj = {}; // 存储路径-json文件名

function walk(handler, dest) {
    FS.listTree(dest || rootPath)
        .then(data => data.filter(item => path.parse(item).ext === '.js')) //留下js文件
        .then(data => data.map(item => {
            item = path.parse(item);
            delete item.root;
            delete item.ext;
            delete item.base;
            return item;
        })) // 存入路径-文件名
        .then(data => {
            data.forEach(handler)
        }) // 处理
        .fail(err => console.log(err));
}

module.exports = function (action, dest) {
    switch(action) {
        case 'mock':
            walk(mock, dest);
            break;
        case 'init':
            walk(rule, dest);
            break;
        case 'reset':
            walk(reset, dest);
            break;
        default:
            break;
    }
};