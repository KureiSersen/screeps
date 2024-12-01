'use strict';

var controllerMemory = require('./controller.memory')
var controllerMovement = require('./controller.movement')

var creepLogisticsMiner = {
    // 采矿
    miner: function (creep) {
        if (controllerMemory.getRAID_MARK(creep.getROOM_NAME())) {
            creep.myMoveTo(controllerMemory.getREFUGE(creep.getROOM_NAME()))
            return 0
        }

        // 拿到工作目标
        var SOURCE_TEAMS = controllerMemory.getSTRUCTURE_TEAMS(creep.getROOM_NAME(), 'MINERAL')

        var target = null
        for (var mineralID in SOURCE_TEAMS) {
            target = Game.getObjectById(mineralID)
        }


        if (target.mineralAmount > 0) {
            // 如果有资源，那么就做harvester
            var HAVEST_POS = controllerMemory.getSTRUCTURE_TEAMSvalueByKeyAndID(creep.getROOM_NAME(), 'MINERAL', target.id, 'HAVEST_POS')
            HAVEST_POS = new RoomPosition(HAVEST_POS[0], HAVEST_POS[1], HAVEST_POS[2])
            if (controllerMovement.isEqualTo(creep, HAVEST_POS))
                creep.harvest(target)
            else
                creep.myMoveTo(HAVEST_POS)

        }
    },
}
module.exports = creepLogisticsMiner;
