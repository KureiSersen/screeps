'use strict';

var structureSpawn = {
    spawn: function (structure) {
        var controllerMemory = require('./controller.memory')
        var NEAR_BY = controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'NEAR_BY')
        var NEXT_BORN = controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'NEXT_BORN')

        if (NEXT_BORN) {
            structure.spawnCreep(NEXT_BORN.BODY, Math.random().toString(36).slice(-3) + '-' + Game.time, {
                memory: { role: NEXT_BORN.ROLE }
            });
        }

        structure.renewCreep(NEAR_BY[0])
    },

}
module.exports = structureSpawn;