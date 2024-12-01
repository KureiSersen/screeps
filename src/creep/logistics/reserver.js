'use strict';

var controllerMemory = require('./controller.memory')

var creepLogisticsReserver = {
    // 宣告
    reserver: function (creep) {
        if (controllerMemory.getRAID_MARK(creep.getROOM_NAME())) {
            creep.myMoveTo(controllerMemory.getREFUGE(creep.getROOM_NAME()))
            return 0
        }

        // 移动到工作房间
        if (creep.getROOM_NAME() !== creep.room.name) {
            creep.myMoveToRoom(creep.getROOM_NAME())
            return 0
        }


        var target = Game.rooms[creep.getROOM_NAME()].controller

        if (target.reservation && target.reservation.username === 'Invader') {
            if (creep.attackController(target) === ERR_NOT_IN_RANGE)
                creep.myMoveTo(target)

        } else {
            if (creep.reserveController(target) === ERR_NOT_IN_RANGE)
                creep.myMoveTo(target)
        }

    },
}

module.exports = creepLogisticsReserver;