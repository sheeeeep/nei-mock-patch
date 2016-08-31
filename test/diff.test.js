const diff = require('../rule.js').diff;
const expect = require('chai').expect;
const testData = require('./testData.js');

describe('无嵌套测试', () => {
    const data = testData.unnestedData; 
    it('相同key相同类型', () => {
        const o = data.sameKeySameType[0];
        const t = data.sameKeySameType[1];
        expect(diff(o, t)).to.be.eql(o)
    })

    it('相同key不同类型', () => {
        const o = data.sameKeyDiffType[0];
        const t = data.sameKeyDiffType[1];
        expect(diff(o, t)).to.be.eql(t)
    })

    it('不同key', () => {
        const o = data.diffKey[0];
        const t = data.diffKey[1];
        expect(diff(o, t)).to.be.eql(t)
    })
})

describe('嵌套测试', () => {
    const data = testData.nestedData; 

    it('相同key相同类型', () => {
        const o = data.sameKeySameType[0];
        const t = data.sameKeySameType[1];
        expect(diff(o, t)).to.be.eql(o);
    })

    it('相同key不同类型', () => {
        const o = data.sameKeyDiffType[0];
        const t = data.sameKeyDiffType[1];
        expect(diff(o, t)).to.be.eql({
            "result": {
                "arr|1": [
                    {
                        "key1-1":  {
                            "key1-2": {
                                "key1-3": 6
                            }
                        }
                    }
                ]
            }
        })
    })

    it('不同key', () => {
        const o = data.diffKey[0];
        const t = data.diffKey[1];
        expect(diff(o, t)).to.be.eql({
            "result": {
                "arr|1": [
                    {
                        "key1":  {
                            "key2": {
                                "key3": 6
                            }
                        }
                    }
                ]
            }
        })
    })
})