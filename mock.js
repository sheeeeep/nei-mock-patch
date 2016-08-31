const Mock = require('mockjs');
const path = require('path');
const FS = require('q-io/fs');
const fs = require('fs');

module.exports.mock = function(file) {
    const item = path.join(file.dir, file.name) + '_rules.json';
    const origin = path.join(file.dir, file.name) + '.json';
    const target = path.join(file.dir, file.name) + '_temp.json';
    fs.rename(origin, target, () => {
        FS.read(item)
            .then(data => JSON.parse(data))
            .then(data => Mock.mock(data))
            .then(data => FS.write(origin, JSON.stringify(data, null, 4)))
            .fail(err => console.error(err))
    })
}
