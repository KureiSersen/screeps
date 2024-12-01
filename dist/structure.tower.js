'use strict';

var structureTower = {
    // 守卫
    tower: function (structure) {
        var controllerMemory = require('./controller.memory')
        var HOSTILE_CREEPS = controllerMemory.getHOSTILE_CREEPS(structure.room.name)

        if (HOSTILE_CREEPS.length > 0) {
            var controllerMovement = require('./controller.movement')
            structure.attack(controllerMovement.findClosestByRange(structure, HOSTILE_CREEPS))
        } else {
            var structureHealer = require('./structure.healer');
            structureHealer.healer(structure)
        }
    },
}

module.exports = structureTower;