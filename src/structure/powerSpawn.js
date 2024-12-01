'use strict';

var structurePowerSpawn = {
    powerSpawn: function (structure) {
        if (structure.store.getUsedCapacity([RESOURCE_ENERGY]) > 50 && structure.store.getUsedCapacity([RESOURCE_POWER]) > 1)
            structure.processPower()
    },
}

module.exports = structurePowerSpawn;