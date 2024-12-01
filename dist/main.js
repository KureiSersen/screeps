'use strict';

// 只执行一次
(() => {
    var myGlobal = require('./config.global')
    global.init = myGlobal.INIT_MEMORY

    var controllerCommand = require('./controller.command')
    controllerCommand.command()

    const mountCreep = require('./creep.mount')
    mountCreep()

    global.route = {}
    /**
     * {
     * roomA:{
     *      roomB:FIND_EXIT_*,
     *      roomC:FIND_EXIT_*,
     *      },
     * roomB:{
     *      roomC:FIND_EXIT_*,
     *      },
     * }
     */

    global.exit = {}
    /**
     * {
     * roomA:{
     *      FIND_EXIT_TOP:[pos,...],
     *      FIND_EXIT_RIGHT:[pos,...],
     *      FIND_EXIT_BOTTOM:[pos,...],
     *      FIND_EXIT_LEFT:[pos,...],
     *      },
     * roomB:{
     *      FIND_EXIT_TOP:[pos,...],
     *      FIND_EXIT_RIGHT:[pos,...],
     *      FIND_EXIT_BOTTOM:[pos,...],
     *      FIND_EXIT_LEFT:[pos,...],
     *      },
     * }
     */

    global.path = {}
    /**
     * {
     * startPositionA:{
     *          endPositionA:pathList,
     *          endPositionB:pathList, 
     *      },
     * startPositionB:{
     *      },
     * } 
     */
})();

var controllerMaintenance = require('./controller.maintenance')
var controllerMemory = require('./controller.memory')
var structureLink = require('./structure.link')
var structureObserver = require('./structure.observer')
var structurePowerSpawn = require('./structure.powerSpawn')
var structureSpawn = require('./structure.spawn')
var structureTerminal = require('./structure.terminal')
var structureTower = require('./structure.tower')

var creepCombatSaboteur = require('./creep.combat.saboteur')

var creepLogisticsBuilder = require('./creep.logistics.builder')
var creepLogisticsHarvester = require('./creep.logistics.harvester')
var creepLogisticsMiner = require('./creep.logistics.miner')
var creepLogisticsUpgrader = require('./creep.logistics.upgrader')
var creepLogisticsCarrier = require('./creep.logistics.carrier')
var creepLogisticsDefender = require('./creep.logistics.defender')
var creepLogisticsMaintainer = require('./creep.logistics.maintainer')
var creepLogisticsReserver = require('./creep.logistics.reserver')

module.exports.loop = function () {
    controllerMaintenance.maintenance()
    

    for (var structureName in Game.structures) {
        var structure = Game.structures[structureName]
        var type = structure.structureType

        if (!controllerMemory.getSTRUCTURE_TEAMS(structure.room.name, type) || !(structure.id in controllerMemory.getSTRUCTURE_TEAMS(structure.room.name, type)))
            continue

        if (type == STRUCTURE_FACTORY) {

        }
        else if (type == STRUCTURE_LAB) {

        }
        else if (type == STRUCTURE_LINK) {
            structureLink.link(structure)
        }
        // else if (type == STRUCTURE_NUKER) {

        // }
        else if (type == STRUCTURE_OBSERVER) {
            structureObserver.observer(structure)
        }
        else if (type == STRUCTURE_POWER_SPAWN) {
            structurePowerSpawn.powerSpawn(structure)
        }
        else if (type == STRUCTURE_SPAWN) {
            structureSpawn.spawn(structure)
        }
        else if (type == STRUCTURE_TERMINAL) {
            structureTerminal.terminal(structure)
        }
        else if (type == STRUCTURE_TOWER) {
            structureTower.tower(structure)
        }
    }


    for (var creepName in Game.creeps) {
        var creep = Game.creeps[creepName]
        var role = creep.getRole()

        // var controllerMemory = require('./controller.memory')
        // if(!controllerMemory.getCREEP_TEAMSbyKey(roomName, role, key))

        // 远征军
        if (role.startsWith('scout')) {

        } else if (role.startsWith('downgrader')) {

        } else if (role.startsWith('nestdestroyer')) {

        } else if (role.startsWith('scoffer')) {

        } else if (role.startsWith('saboteur')) {
            creepCombatSaboteur.saboteur(creep)
        }

        // 后勤
        else if (role.startsWith('builder')) {
            creepLogisticsBuilder.builder(creep)
        }
        else if (role.startsWith('harvester')) {
            creepLogisticsHarvester.harvester(creep)
        }
        else if (role.startsWith('miner')) {
            creepLogisticsMiner.miner(creep)
        }
        else if (role.startsWith('upgrader')) {
            creepLogisticsUpgrader.upgrader(creep)
        }
        else if (role.startsWith('carrier')) {
            creepLogisticsCarrier.carrier(creep)
        }
        else if (role.startsWith('defender')) {
            creepLogisticsDefender.defender(creep)
        }
        else if (role.startsWith('maintainer')) {
            creepLogisticsMaintainer.maintainer(creep)
        }
        else if (role.startsWith('reserver')) {
            creepLogisticsReserver.reserver(creep)
        }

    }

}

