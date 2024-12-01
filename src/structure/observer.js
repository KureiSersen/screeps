'use strict';

var structureObserver = {
    // 眼
    observer: function (structure) {
        // 循环观看reserve房间
        var controllerMemory = require('./controller.memory')
        var NEXT_ROOM = controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'NEXT_ROOM')

        structure.observeRoom(NEXT_ROOM)
    },
}

module.exports = structureObserver;