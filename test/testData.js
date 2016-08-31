module.exports.unnestedData = {
    sameKeySameType: [
        {
            "key|+1": 6
        },
        {
            "key": 4
        }
    ],
    sameKeyDiffType : [
        {
            "result": {
                "key|1": {
                    "prop": 2
                }
            }
        },
        {
            "result": {
                "key": [2]
            }
        }
    ],
    diffKey : [
        {
            "key1|+1": 6
        },
        {
            "key2": 4
        }
    ]
}


module.exports.nestedData = {
    sameKeySameType : [
        {
            "result": {
                "arr|1": [
                    {
                        "key|2": [ [{
                            "key2|3": {
                                "key3|4": 5
                            }
                        }]]
                    }
                ]
            }
        },{
            "result": {
                "arr": [
                    {
                        "key": [ [{
                            "key2": {
                                "key3": 6
                            }
                        }]]
                    }
                ]
            }
        }
    ],
    sameKeyDiffType: [
        {
            "result": {
                "arr|1": [
                    {
                        "key1-1|2": [ [{
                            "key1-2|3": {
                                "key1-3|4": 5
                            }
                        }]]
                    }
                ]
            }
        },{
            "result": {
                "arr": [
                    {
                        "key1-1":  {
                            "key1-2": {
                                "key1-3": 6
                            }
                        }
                    }
                ]
            }
        }
    ],
    diffKey: [
        {
            "result": {
                "arr|1": [
                    {
                        "key1-1|2": [ [{
                            "key1-2|3": {
                                "key1-3|4": 5
                            }
                        }]]
                    }
                ]
            }
        },{
            "result": {
                "arr": [
                    {
                        "key1":  {
                            "key2": {
                                "key3": 6
                            }
                        }
                    }
                ]
            }
        }
    ],
}