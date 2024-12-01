'use strict';

var controllerMemory = require('./controller.memory')

var creepLogisticsRepair = {
    // 维修
    repair: function (creep) {
        if (controllerMemory.getRAID_MARK(creep.getROOM_NAME())) {
            creep.myMoveTo(controllerMemory.getREFUGE(creep.getROOM_NAME()))
            return 0
        }

        // 拿到工作目标
        var STRUCTURES_NEED_REPAIR = controllerMemory.getSTRUCTURES_NEED_REPAIR(creep.getROOM_NAME())

        if (STRUCTURES_NEED_REPAIR.length) {
            creep.setWorkingMark()

            if (!creep.memory.working) {
                // 没energy
                var ENERGY_SOURCE = creep.getENERGY_SOURCE()
                var DROPPED_SOURCE = controllerMemory.getDROPPED_SOURCE(creep.getROOM_NAME()).filter((resource) => { return resource.resourceType === RESOURCE_ENERGY })
                var targetList = ENERGY_SOURCE.concat(DROPPED_SOURCE).filter(el => el)

                if (targetList.length) {
                    var target = targetList[0]
                    if ('structureType' in target) {
                        if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
                            creep.myMoveTo(target)
                    } else if ('resourceType' in target) {
                        if (creep.pickup(target) === ERR_NOT_IN_RANGE)
                            creep.myMoveTo(target)
                    }
                } else {
                    // HANG
                    creep.myMoveTo( creep.getHANG_POS())
                }

            } else {
                // 有energy
                var target = STRUCTURES_NEED_REPAIR[0]
                if (creep.repair(target) === ERR_NOT_IN_RANGE)
                    creep.myMoveTo(target)
            }
        } else {
            // 酌情变成upgrader
            if (controllerMemory.getRESERVE_OR_CONTROL(creep.getROOM_NAME()) === 'CONTROL') {
                var creepLogisticsUpgrader = require('./creep.logistics.upgrader')
                creepLogisticsUpgrader.upgrader(creep)
            } else
                creep.myMoveTo( creep.getHANG_POS())
        }
    }
}


module.exports = creepLogisticsRepair;