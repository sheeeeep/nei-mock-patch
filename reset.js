const path = require('path');
const FS = require('q-io/fs');

module.exports.reset = function(file) {
    const origin = path.join(file.dir, file.name) + '_temp.json';
    const target = path.join(file.dir, file.name) + '.json';
    FS.rename(origin, target).fail(err => console.log(err));
}