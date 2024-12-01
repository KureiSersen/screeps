// 同步到内存中的对象
var E13N26 = require('./config.room.E13N26');
var E15N27 = require('./config.room.E15N27');
// var E14N27 = require('./config.room.E14N27');//reserve
// var E16N27 = require('./config.room.E16N27');//reserve
// var E17N25 = require('./config.room.E17N25');
// var E17N26 = require('./config.room.E17N26');
var E18N24 = require('./config.room.E18N24');
var E18N25 = require('./config.room.E18N25');
// var E19N23 = require('./config.room.E19N23');
var E19N24 = require('./config.room.E19N24');
var E19N26 = require('./config.room.E19N26');
// var E18N26 = require('./config.room.E18N26');
var E21N22 = require('./config.room.E21N22');
// var E22N22 = require('./config.room.E22N22');
// var E23N21 = require('./config.room.E23N21');
var E23N22 = require('./config.room.E23N22');



var INIT_MEMORY = {
    // reserve房间
    ROOM_LIST: {
        E13N26: E13N26,
        // E14N27: E14N27,
        E15N27: E15N27,
        // E16N27: E16N27,
        E18N25: E18N25,
        // E17N25: E17N25,
        // E17N26: E17N26,
        E18N24: E18N24,
        E19N26: E19N26,
        // E18N26: E18N26,
        E19N24: E19N24,
        // E19N23: E19N23,
        E21N22: E21N22,
        // E22N22: E22N22,
        E23N22: E23N22,
        // E23N21: E23N21,
    },

    ALLOW_ROOM_LIST: [
        'E13N26',
        'E13N27',
        'E14N27',
        'E15N27',
        'E16N27',
        'E18N25',
        'E17N25',
        'E17N26',
        'E18N24',
        'E19N26',
        'E18N26',
        'E19N24',
        'E19N23',
        'E21N22',
        'E22N22',
        'E23N22',
        'E23N21',
    ]

}


module.exports = { INIT_MEMORY }