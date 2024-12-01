'use strict';

var structureRepairer = {
    // 维修
    repairer: function (structure) {
        var controllerMemory = require('./controller.memory')
        var STRUCTURES_NEED_REPAIR = controllerMemory.getSTRUCTURES_NEED_REPAIR(structure.room.name)

        if (STRUCTURES_NEED_REPAIR.length) {
            structure.repair(STRUCTURES_NEED_REPAIR[0])
        }
    },
}

module.exports = structureRepairer;