'use strict';

var controllerMemory = require('./controller.memory')

var creepLogisticsUpgrader = {
    // 升级
    upgrader: function (creep) {
        if (controllerMemory.getRAID_MARK(creep.getROOM_NAME())) {
            creep.myMoveTo(controllerMemory.getREFUGE(creep.getROOM_NAME()))
            return 0
        }

        // 移动到工作房间
        if (creep.getROOM_NAME() !== creep.room.name) {
            creep.myMoveToRoom(creep.getROOM_NAME())
            return 0
        }

        creep.setWorkingMark()

        if (!creep.memory.working) {
            // 没energy
            var ENERGY_SOURCE = creep.getENERGY_SOURCE()

            if (ENERGY_SOURCE.length) {
                var target = ENERGY_SOURCE[0]
                if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
                    creep.myMoveTo(target)

            } else {
                // HANG
                creep.myMoveTo(creep.getHANG_POS())
            }

        } else {
            // 有energy
            var target = Game.rooms[creep.getROOM_NAME()].controller
            if (creep.upgradeController(target) === ERR_NOT_IN_RANGE)
                creep.myMoveTo(target)
        }
    },
}

module.exports = creepLogisticsUpgrader;