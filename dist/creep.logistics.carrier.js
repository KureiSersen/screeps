'use strict';

var controllerMemory = require('./controller.memory')

var creepLogisticsCarrier = {
    // 拾荒
    carrier: function (creep) {
        if (controllerMemory.getRAID_MARK(creep.getROOM_NAME())) {
            creep.myMoveTo(controllerMemory.getREFUGE(creep.getROOM_NAME()))
            return 0
        }

        // 拿到工作目标
        var ENERGY_DESTINATION = creep.getENERGY_DESTINATION()

        // 标记工作状态
        creep.setWorkingMark()

        if (!creep.memory.working) {
            // 没energy
            // 移动到工作房间
            if (creep.getROOM_NAME() !== creep.room.name) {
                creep.myMoveToRoom(creep.getROOM_NAME())
                return 0
            }


            var DROPPED_SOURCE = controllerMemory.getDROPPED_SOURCE(creep.getROOM_NAME())

            var TOMBSTONE_WITH_SOURCE = controllerMemory.getTOMBSTONE_WITH_SOURCE(creep.getROOM_NAME())

            var RUIN_WITH_SOURCE = controllerMemory.getRUIN_WITH_SOURCE(creep.getROOM_NAME())

            var ENERGY_SOURCE = creep.getENERGY_SOURCE()

            var targetList = DROPPED_SOURCE.concat(TOMBSTONE_WITH_SOURCE, RUIN_WITH_SOURCE, ENERGY_SOURCE).filter(el => el)

            if (targetList.length) {
                creep.assignMark({ '0': 1, '1': 1 })
                var target = null
                if (creep.memory.mark == '0') {
                    target = targetList[0]
                } else if (creep.memory.mark == '1') {
                    target = targetList[targetList.length - 1]
                }

                if ('structureType' in target || 'store' in target) {
                    creep.withdrawAll(target)

                } else if ('resourceType' in target) {
                    if (creep.pickup(target) === ERR_NOT_IN_RANGE)
                        creep.myMoveTo(target)
                }
            }
            else {
                creep.myMoveTo(creep.getHANG_POS())
            }
        } else {
            // 有energy
            var target = ENERGY_DESTINATION[0]
            if (target.store.getFreeCapacity() === 0)
                creep.myMoveTo(creep.getHANG_POS())
            else
                creep.transferAll(target)
        }
    }
}


module.exports = creepLogisticsCarrier;