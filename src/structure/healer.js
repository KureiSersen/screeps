'use strict';

var structureHealer = {
    // 维修
    healer: function (structure) {
        var controllerMemory = require('./controller.memory')
        var MY_CREEPS_NEED_HEAL = controllerMemory.getMY_CREEPS_NEED_HEAL(structure.room.name)

        if (MY_CREEPS_NEED_HEAL.length > 0) {
            var controllerMovement = require('./controller.movement')
            structure.heal(controllerMovement.findClosestByRange(structure, MY_CREEPS_NEED_HEAL))
        } else {
            var structureRepairer = require('./structure.repairer');
            structureRepairer.repairer(structure)
        }
    },
}

module.exports = structureHealer;