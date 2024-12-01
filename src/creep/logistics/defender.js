'use strict';

var controllerMemory = require('./controller.memory')
var controllerMovement = require('./controller.movement')

var creepLogisticsDefender = {
    // 守卫
    defender: function (creep) {
        // 移动到工作房间
        if (creep.getROOM_NAME() !== creep.room.name) {
            creep.myMoveToRoom(creep.getROOM_NAME())
            return 0
        }

        // 拿到工作目标
        var HOSTILE_STRUCTURES = controllerMemory.getHOSTILE_STRUCTURES(creep.getROOM_NAME())
        var HOSTILE_CREEPS = controllerMemory.getHOSTILE_CREEPS(creep.getROOM_NAME())

        if (HOSTILE_CREEPS.length) {
            var target = HOSTILE_CREEPS[0]

            if (controllerMovement.getDirectionTo(creep, target) === 1) {
                creep.attack(target)
                creep.rangedAttack(target)
            } else if (controllerMovement.getDirectionTo(creep, target) === 3) {
                creep.rangedAttack(target)
            } else {
                creep.myMoveTo(target);
            }

        } else if (HOSTILE_STRUCTURES.length) {
            var target = HOSTILE_STRUCTURES[0]

            if (!controllerMovement.isNearTo(creep, target)) {
                creep.myMoveTo(target);
            } else {
                creep.attack(target)
                creep.rangedAttack(target)
            }
        } else {
            if (!Game.rooms[creep.getROOM_NAME()]) {
                creep.myMoveTo(null)
            } else {
                creep.myMoveTo(creep.getHANG_POS())
            }
        }
    },
}

module.exports = creepLogisticsDefender;