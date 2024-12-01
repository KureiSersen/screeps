'use strict';

var controllerMemory = require('./controller.memory')
var controllerMovement = require('./controller.movement')

function harvestEnergy(creep, target) {
    var CONTAINER = controllerMemory.getSTRUCTURE_TEAMSvalueByKeyAndID(creep.getROOM_NAME(), 'SOURCE', target.id, 'CONTAINER')
    var LINK = controllerMemory.getSTRUCTURE_TEAMSvalueByKeyAndID(creep.getROOM_NAME(), 'SOURCE', target.id, 'LINK')

    CONTAINER = Game.getObjectById(CONTAINER)
    LINK = Game.getObjectById(LINK)

    if (CONTAINER && LINK) {
        if (CONTAINER.store.getFreeCapacity() < 800 || target.energy === 0) {
            creep.setWorkingMark()
            if (!creep.memory.working)
                creep.withdraw(CONTAINER, controllerMemory.getSTRUCTURE_TEAMSvalueByKeyAndID(creep.getROOM_NAME(), 'SOURCE', target.id, 'RESOURCES_TYPE'))
            else
                creep.transfer(LINK, controllerMemory.getSTRUCTURE_TEAMSvalueByKeyAndID(creep.getROOM_NAME(), 'SOURCE', target.id, 'RESOURCES_TYPE'))

        } else {
            creep.harvest(target)
        }
    } else {
        creep.harvest(target)
    }

}


var creepLogisticsHarvester = {
    // 采矿
    harvester: function (creep) {
        if (controllerMemory.getRAID_MARK(creep.getROOM_NAME())) {
            creep.myMoveTo(controllerMemory.getREFUGE(creep.getROOM_NAME()))
            return 0
        }

        // 移动到工作房间
        if (creep.getROOM_NAME() !== creep.room.name) {
            creep.myMoveToRoom(creep.getROOM_NAME())
            return 0
        }

        var SOURCE_TEAMS = controllerMemory.getSTRUCTURE_TEAMS(creep.getROOM_NAME(), 'SOURCE')

        var dict = {}
        for (var sourceID in SOURCE_TEAMS) {
            dict[sourceID] = 1
        }

        creep.assignMark(dict)
        var target = Game.getObjectById(creep.memory.mark)

        var HAVEST_POS = controllerMemory.getSTRUCTURE_TEAMSvalueByKeyAndID(creep.getROOM_NAME(), 'SOURCE', target.id, 'HAVEST_POS')
        HAVEST_POS = new RoomPosition(HAVEST_POS[0], HAVEST_POS[1], HAVEST_POS[2])

        if (controllerMemory.getRESERVE_OR_CONTROL(creep.getROOM_NAME()) === 'CONTROL') {
            if (!controllerMovement.isEqualTo(creep, HAVEST_POS)) {
                creep.myMoveTo(HAVEST_POS)
                return 0
            }
            harvestEnergy(creep, target)

        } else if (controllerMemory.getRESERVE_OR_CONTROL(creep.getROOM_NAME()) === 'RESERVE') {
            if (target.energy > 0) {
                if (!controllerMovement.isEqualTo(creep, HAVEST_POS)) {
                    creep.myMoveTo(HAVEST_POS)
                    return 0
                }
                harvestEnergy(creep, target)

            } else {
                // 变成builder
                var creepLogisticsBuilder = require('./creep.logistics.builder')
                creepLogisticsBuilder.builder(creep)
            }
        }
    },
}
module.exports = creepLogisticsHarvester;
