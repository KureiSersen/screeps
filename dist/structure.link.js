'use strict';

var structureLink = {
    link: function (structure) {
        var TARGET_LIST = null

        var controllerMemory = require('./controller.memory')
        TARGET_LIST = controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'TARGET')

        if (TARGET_LIST.length) {
            for (var ID of TARGET_LIST) {
                var TARGET = Game.getObjectById(ID)
                if (TARGET && controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'ISFULL') === true && controllerMemory.getSTRUCTURE_TEAMSvalueByKey(TARGET, 'ISEMPTY') === true) {
                    structure.transferEnergy(TARGET)
                }
            }
        }
    },
}

module.exports = structureLink;