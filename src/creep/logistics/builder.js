'use strict';

var controllerMemory = require('./controller.memory')
var controllerMovement = require('./controller.movement')

var creepLogisticsBuilder = {
    // 建造
    builder: function (creep) {
        if (controllerMemory.getRAID_MARK(creep.getROOM_NAME())) {
            creep.myMoveTo(controllerMemory.getREFUGE(creep.getROOM_NAME()))
            return 0
        }

        // 移动到工作房间
        if (creep.getROOM_NAME() !== creep.room.name) {
            creep.myMoveToRoom(creep.getROOM_NAME())
            return 0
        }
        
        // 拿到工作目标
        var CONSTRUCTION_SITE = controllerMemory.getCONSTRUCTION_SITE(creep.getROOM_NAME())

        if (CONSTRUCTION_SITE.length) {
            creep.setWorkingMark()

            if (!creep.memory.working) {
                // 没energy
                var ENERGY_SOURCE = creep.getENERGY_SOURCE()
                var DROPPED_SOURCE = controllerMemory.getDROPPED_SOURCE(creep.getROOM_NAME()).filter((resource) => { return resource.resourceType === RESOURCE_ENERGY })
                var targetList = ENERGY_SOURCE.concat(DROPPED_SOURCE).filter(el => el)

                if (targetList.length) {
                    var target = controllerMovement.findClosestByRange(creep, targetList)
                    if ('structureType' in target) {
                        if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
                            creep.myMoveTo(target)
                    } else if ('resourceType' in target) {
                        if (creep.pickup(target) === ERR_NOT_IN_RANGE)
                            creep.myMoveTo(target)
                    }
                } else {
                    // HANG
                    creep.myMoveTo(creep.getHANG_POS())
                }

            } else {
                // 有energy
                var target = CONSTRUCTION_SITE[0]
                if (creep.build(target) === ERR_NOT_IN_RANGE)
                    creep.myMoveTo(target)
            }

        } else {
            // 变成repair
            var creepLogisticsRepair = require('./creep.logistics.repairer')
            creepLogisticsRepair.repair(creep)
        }
    }
}


module.exports = creepLogisticsBuilder;