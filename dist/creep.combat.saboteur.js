'use strict';

var controllerMovement = require('./controller.movement')

var creepCombatSaboteur = {
    // 拆毁围墙
    saboteur: function (creep) {
        var targetFlag = Game.flags['saboteur']
        if (typeof (targetFlag) === 'undefined')
            return 0

        var targetROOM_NAME = targetFlag.pos.roomName

        // 移动到工作房间
        if (targetROOM_NAME !== creep.room.name) {
            creep.myMoveToRoom(targetROOM_NAME)
            return 0
        }

        var targetList = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (controllerMovement.isEqualTo(structure, targetFlag))
            }
        });

        if (targetList.length) {
            if (creep.dismantle(targetList[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetList[0], {
                    visualizePathStyle: { stroke: '#FBE67F', strokeWidth: 0.5, opacity: 0.5 },
                    ignoreRoads: true,
                    maxRooms: 1,
                })
            }
        } else {
            creep.moveTo(targetFlag, {
                visualizePathStyle: { stroke: '#FBE67F', strokeWidth: 0.5, opacity: 0.5 },
                ignoreRoads: true,
                maxRooms: 1,
            })
        }
    },
}

module.exports = creepCombatSaboteur;