'use strict';
var controllerMemory = require('./controller.memory')
var controllerMovement = require('./controller.movement')
var ROOM_LIST = global.init.ROOM_LIST

function roomInit() {
    for (var roomName in ROOM_LIST) {
        if (typeof Game.rooms[roomName] === "undefined") {
            controllerMemory.setHOSTILE_CREEPS(roomName, [])
            controllerMemory.setHOSTILE_STRUCTURES(roomName, [])
            controllerMemory.setRAID_MARK(roomName, true)
            controllerMemory.setCONSTRUCTION_SITE(roomName, [])
            controllerMemory.setRUIN_WITH_SOURCE(roomName, [])
            controllerMemory.setTOMBSTONE_WITH_SOURCE(roomName, [])
            controllerMemory.setDROPPED_SOURCE(roomName, [])

        } else {
            controllerMemory.setHOSTILE_CREEPS(roomName, Game.rooms[roomName].find(FIND_HOSTILE_CREEPS))
            controllerMemory.setHOSTILE_STRUCTURES(roomName, Game.rooms[roomName].find(FIND_HOSTILE_STRUCTURES))
            controllerMemory.setRAID_MARK(roomName, false)
            controllerMemory.setCONSTRUCTION_SITE(roomName, Game.rooms[roomName].find(FIND_CONSTRUCTION_SITES))
            controllerMemory.setRUIN_WITH_SOURCE(roomName, Game.rooms[roomName].find(FIND_RUINS, {
                filter: (i) => i.store.getUsedCapacity() > 0
            }))
            controllerMemory.setTOMBSTONE_WITH_SOURCE(roomName, Game.rooms[roomName].find(FIND_TOMBSTONES, {
                filter: (i) => i.store.getUsedCapacity() > 0
            }))
            controllerMemory.setDROPPED_SOURCE(roomName, Game.rooms[roomName].find(FIND_DROPPED_RESOURCES, {
                filter: (i) => i.amount > 0
            }))




        }

        controllerMemory.setCREEP_MEMORY_MARK_NUM(roomName, '', '', '', '')
        controllerMemory.setMY_CREEPS_NEED_HEAL(roomName, [])
        controllerMemory.setSTRUCTURES_NEED_REPAIR(roomName, [])

        // 初始化SEND_IN
        for (var structureName in controllerMemory.getSEND_IN(roomName, '')) {
            controllerMemory.setSEND_IN(roomName, structureName, [])
        }

        // 初始化MOVE_OUT
        for (var structureName in controllerMemory.getMOVE_OUT(roomName, '')) {
            controllerMemory.setMOVE_OUT(roomName, structureName, [])
        }

        // 初始化creep_teams
        for (var roleName in controllerMemory.getCREEP_TEAMS(roomName)) {
            controllerMemory.setCREEP_TEAMSvalueByKey(roomName, roleName, 'FACT_NUMBER', 0)
        }

        // 初始化link
        for (var ID in controllerMemory.getSTRUCTURE_TEAMS(roomName, STRUCTURE_LINK)) {
            controllerMemory.setSTRUCTURE_TEAMSvalueByKeyAndID(roomName, STRUCTURE_LINK, ID, 'ISFULL', false)
            controllerMemory.setSTRUCTURE_TEAMSvalueByKeyAndID(roomName, STRUCTURE_LINK, ID, 'ISEMPTY', false)
        }

        // 初始化spawn
        for (var ID in controllerMemory.getSTRUCTURE_TEAMS(roomName, STRUCTURE_SPAWN)) {
            controllerMemory.setSTRUCTURE_TEAMSvalueByKeyAndID(roomName, STRUCTURE_SPAWN, ID, 'NEAR_BY', [])
            controllerMemory.setSTRUCTURE_TEAMSvalueByKeyAndID(roomName, STRUCTURE_SPAWN, ID, 'NEXT_BORN', null)
        }

        // 初始化powerSpawn
        for (var ID in controllerMemory.getSTRUCTURE_TEAMS(roomName, STRUCTURE_POWER_SPAWN)) {
            controllerMemory.setSTRUCTURE_TEAMSvalueByKeyAndID(roomName, STRUCTURE_POWER_SPAWN, ID, 'ORDER_CONTENT', {})
        }

        // 初始化nuker
        for (var ID in controllerMemory.getSTRUCTURE_TEAMS(roomName, STRUCTURE_NUKER)) {
            controllerMemory.setSTRUCTURE_TEAMSvalueByKeyAndID(roomName, STRUCTURE_NUKER, ID, 'ORDER_CONTENT', {})
        }

    }
}

function keepPowerCreep() {
    for (var creepName in Game.powerCreeps) {
        var powerCreep = Game.powerCreeps[creepName]
        var roomName = powerCreep.room.name
        if (powerCreep.ticksToLive < 1000) {
            var powerSpawnID = null
            for (var temp in controllerMemory.getSTRUCTURE_TEAMS(roomName, STRUCTURE_POWER_SPAWN)) {
                powerSpawnID = temp
            }
            powerCreep.renew(Game.getObjectById(powerSpawnID))
        }
    }
}

function keepCreepMemory() {
    for (var i in Memory.creeps) {
        if (!Game.creeps[i])
            delete Memory.creeps[i];
        else {
            // 计算实际creep角色数量
            var role = Memory.creeps[i].role
            var roleName = role.split('_')[0].toUpperCase()
            var roomName = role.split('_')[2]

            controllerMemory.setCREEP_TEAMSvalueByKey(roomName, roleName, 'FACT_NUMBER', controllerMemory.getCREEP_TEAMSbyKey(roomName, roleName, 'FACT_NUMBER') + 1)
            // 更新CREEP_MEMORY_MARK_NUM harvester mark参数
            if ((role.startsWith('harvester') || role.startsWith('maintainer') || role.startsWith('carrier')) && 'mark' in Memory.creeps[i]) {
                controllerMemory.setCREEP_MEMORY_MARK_NUM(roomName, role, 'mark', Memory.creeps[i].mark, controllerMemory.getCREEP_MEMORY_MARK_NUM(roomName, role, 'mark', Memory.creeps[i].mark) + 1)
            }
        }
    }
}

function keepCreep() {
    for (var creepName in Game.creeps) {
        var creep = Game.creeps[creepName]
        var roomName = creep.room.name
        if (roomName in ROOM_LIST) {
            var temp = controllerMemory.getMY_CREEPS_NEED_HEAL(roomName)

            if (creep.hits < creep.hitsMax)
                temp.push(creep)

            controllerMemory.setMY_CREEPS_NEED_HEAL(roomName, temp)
        }

    }
}

function keepStructure() {
    for (var structureName in Game.structures) {
        var structure = Game.structures[structureName]
        var roomName = structure.room.name
        var type = structure.structureType

        if (type !== STRUCTURE_RAMPART && (!controllerMemory.getSTRUCTURE_TEAMS(roomName, type) || !(structure.id in controllerMemory.getSTRUCTURE_TEAMS(roomName, type))))
            continue

        // 需要维修的建筑物和城墙
        var WALL_RAMPART_HITS = controllerMemory.getWALL_RAMPART_HITS(roomName)
        if (structure.structureType === STRUCTURE_RAMPART) {
            if ((structure.hits < WALL_RAMPART_HITS) && (structure.hits < structure.hitsMax)) {
                var temp = controllerMemory.getSTRUCTURES_NEED_REPAIR(roomName)
                temp.push(structure)
                controllerMemory.setSTRUCTURES_NEED_REPAIR(roomName, temp)
            }
        } else {
            if (structure.hits < structure.hitsMax) {
                var temp = controllerMemory.getSTRUCTURES_NEED_REPAIR(roomName)
                temp.push(structure)
                controllerMemory.setSTRUCTURES_NEED_REPAIR(roomName, temp)
            }
        }

        // 计算LINK
        if (structure.structureType === STRUCTURE_LINK) {
            if (structure.store.getUsedCapacity([RESOURCE_ENERGY]) === 0)
                controllerMemory.setSTRUCTURE_TEAMSvalueByKey(structure, 'ISEMPTY', true)

            if (structure.store.getFreeCapacity([RESOURCE_ENERGY]) === 0)
                controllerMemory.setSTRUCTURE_TEAMSvalueByKey(structure, 'ISFULL', true)
        }

        // 计算spawn
        if (structure.structureType === STRUCTURE_SPAWN) {
            // 计算NEAR_BY参数
            for (var creepName in Game.creeps) {
                var creep = Game.creeps[creepName]
                if (creep.room.name === roomName) {
                    if (controllerMovement.isNearTo(creep, structure)) {
                        var temp = controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'NEAR_BY')
                        temp.push(creep)
                        controllerMemory.setSTRUCTURE_TEAMSvalueByKey(structure, 'NEAR_BY', temp)
                    }
                }
            }

            // 计算NEXT_BORN参数
            for (var tempRoomName in ROOM_LIST) {
                if (ROOM_LIST[tempRoomName].CONTROLLER_ROOM_NAME === roomName) {
                    for (var roleName in controllerMemory.getCREEP_TEAMS(tempRoomName)) {
                        if (!controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'NEXT_BORN') && controllerMemory.getCREEP_TEAMSbyKey(tempRoomName, roleName, 'NUMBER') > controllerMemory.getCREEP_TEAMSbyKey(tempRoomName, roleName, 'FACT_NUMBER') && !structure.spawning) {
                            controllerMemory.setSTRUCTURE_TEAMSvalueByKey(structure, 'NEXT_BORN', controllerMemory.getCREEP_TEAMSbyRole(tempRoomName, roleName))
                            controllerMemory.setCREEP_TEAMSvalueByKey(tempRoomName, roleName, 'FACT_NUMBER', controllerMemory.getCREEP_TEAMSbyKey(tempRoomName, roleName, 'FACT_NUMBER') + 1)
                        }
                    }
                }
            }
        }

        // 计算powerSpawn
        if (structure.structureType === STRUCTURE_POWER_SPAWN) {
            var enable = controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'ENABLE')
            if (enable) {
                if (structure.store.getFreeCapacity([RESOURCE_ENERGY]) >= 1000 || structure.store.getFreeCapacity([RESOURCE_POWER]) >= 20) {
                    var ORDER_CONTENT = {}
                    ORDER_CONTENT[RESOURCE_ENERGY] = structure.store.getFreeCapacity([RESOURCE_ENERGY])
                    ORDER_CONTENT[RESOURCE_POWER] = structure.store.getFreeCapacity([RESOURCE_POWER])
                    controllerMemory.setSTRUCTURE_TEAMSvalueByKey(structure, 'ORDER_CONTENT', ORDER_CONTENT)
                }
            }
        }

        // 计算nuker
        if (structure.structureType === STRUCTURE_NUKER) {
            var enable = controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'ENABLE')
            if (enable) {
                if (structure.store.getFreeCapacity([RESOURCE_ENERGY]) > 0 || structure.store.getFreeCapacity([RESOURCE_GHODIUM]) > 0) {
                    var ORDER_CONTENT = {}
                    ORDER_CONTENT[RESOURCE_ENERGY] = structure.store.getFreeCapacity([RESOURCE_ENERGY])
                    ORDER_CONTENT[RESOURCE_GHODIUM] = structure.store.getFreeCapacity([RESOURCE_GHODIUM])
                    controllerMemory.setSTRUCTURE_TEAMSvalueByKey(structure, 'ORDER_CONTENT', ORDER_CONTENT)
                }
            }
        }

        // 计算observer
        // if (structure.structureType === STRUCTURE_OBSERVER) {
        //     var RESERVE_ROOM_LIST = []

        //     for (roomName in ROOM_LIST) {
        //         if (controllerMemory.getRESERVE_OR_CONTROL(roomName) === 'RESERVE') {
        //             RESERVE_ROOM_LIST.push(roomName)
        //         }
        //     }

        //     var NEXT_ROOM = controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'NEXT_ROOM')

        //     if (NEXT_ROOM === '') {
        //         controllerMemory.setSTRUCTURE_TEAMSvalueByKey(structure, 'NEXT_ROOM', RESERVE_ROOM_LIST[0])
        //     } else {
        //         var index = (RESERVE_ROOM_LIST.indexOf(NEXT_ROOM) + 1) % RESERVE_ROOM_LIST.length
        //         controllerMemory.setSTRUCTURE_TEAMSvalueByKey(structure, 'NEXT_ROOM', RESERVE_ROOM_LIST[index])
        //     }

        // }
    }
}

function roomFinalize() {
    for (var roomName in ROOM_LIST) {
        if (typeof Game.rooms[roomName] === "undefined") {

        } else {
            // 确定RAID_MARK
            if (controllerMemory.getHOSTILE_CREEPS(roomName).length)
                controllerMemory.setRAID_MARK(roomName, true)

            // 确定STRUCTURES_NEED_REPAIR
            var structureTypeList = [STRUCTURE_TOWER, STRUCTURE_CONTAINER, STRUCTURE_ROAD, STRUCTURE_SPAWN, STRUCTURE_WALL, STRUCTURE_RAMPART, STRUCTURE_EXTENSION, STRUCTURE_EXTRACTOR, STRUCTURE_FACTORY, STRUCTURE_LAB, STRUCTURE_LINK, STRUCTURE_NUKER, STRUCTURE_OBSERVER, STRUCTURE_POWER_SPAWN, STRUCTURE_STORAGE, STRUCTURE_TERMINAL]
            var targetList = controllerMemory.getSTRUCTURES_NEED_REPAIR(roomName)

            // 添加上中立建筑
            var road_need_repair = Game.rooms[roomName].find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_ROAD) &&
                        (structure.hits < structure.hitsMax);
                }
            });

            var WALL_RAMPART_HITS = controllerMemory.getWALL_RAMPART_HITS(roomName)
            var wall_need_repair = Game.rooms[roomName].find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_WALL) &&
                        (structure.hits < WALL_RAMPART_HITS) && (structure.hits < structure.hitsMax);
                }
            });

            var container_need_repair = Game.rooms[roomName].find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_CONTAINER) &&
                        (structure.hits < structure.hitsMax);
                }
            });

            targetList = targetList.concat(container_need_repair, road_need_repair, wall_need_repair)

            if (targetList.length > 1) {
                targetList.sort((firstObj, secondObj) => {
                    return structureTypeList.indexOf(firstObj.structureType) - structureTypeList.indexOf(secondObj.structureType)
                })
            }
            controllerMemory.setSTRUCTURES_NEED_REPAIR(roomName, targetList)

            // 确定SEND_IN
            for (var structureName in controllerMemory.getSEND_IN(roomName, '')) {

                var temp = []
                for (var structureID in controllerMemory.getSTRUCTURE_TEAMS(roomName, structureName.toLowerCase())) {
                    temp.push(structureID)
                }

                var STRUCTURE_TEAMS = temp.map(function (e) {
                    return Game.getObjectById(e)
                }).filter(e => e)

                if (structureName === 'EXTENSION') {
                    STRUCTURE_TEAMS = STRUCTURE_TEAMS.filter(structure => {
                        return structure && structure.store.getFreeCapacity([RESOURCE_ENERGY]) > 0
                    });
                }
                else if (structureName === 'SPAWN') {
                    STRUCTURE_TEAMS = STRUCTURE_TEAMS.filter(structure => {
                        return structure && structure.store.getFreeCapacity([RESOURCE_ENERGY]) > 40
                    });
                }
                else if (structureName === 'TOWER') {
                    STRUCTURE_TEAMS = STRUCTURE_TEAMS.filter(structure => {
                        return structure && structure.store.getFreeCapacity([RESOURCE_ENERGY]) > structure.store.getCapacity([RESOURCE_ENERGY]) * 0.2
                    });
                }
                else if (structureName === 'LINK') {
                    STRUCTURE_TEAMS = STRUCTURE_TEAMS.filter(structure => {
                        return structure && controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'MAIN') && controllerMemory.getSTRUCTURE_TEAMSvalueByKeyAndID(roomName, STRUCTURE_LINK, controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'TARGET')[0], 'ISEMPTY')
                    });
                }
                else if (structureName === 'TERMINAL') {
                    if (STRUCTURE_TEAMS.length) {
                        var structure = STRUCTURE_TEAMS[0]
                        if (!(controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'TARGET') || controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'ORDER_ID'))) {
                            STRUCTURE_TEAMS = []
                        }
                    } else
                        STRUCTURE_TEAMS = []
                }
                else if (structureName === 'POWERSPAWN' || structureName === 'NUKER') {
                    if (STRUCTURE_TEAMS.length) {
                        var structure = STRUCTURE_TEAMS[0]
                        if (!(controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'ENABLE') && Object.keys(controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'ORDER_CONTENT')).length !== 0)) {
                            STRUCTURE_TEAMS = []
                        }
                    } else
                        STRUCTURE_TEAMS = []
                }
                controllerMemory.setSEND_IN(roomName, structureName, STRUCTURE_TEAMS)
            }

            // 确定MOVE_OUT
            for (var structureName in controllerMemory.getMOVE_OUT(roomName, '')) {

                var temp = []
                for (var structureID in controllerMemory.getSTRUCTURE_TEAMS(roomName, structureName.toLowerCase())) {
                    temp.push(structureID)
                }

                var STRUCTURE_TEAMS = temp.map(function (e) {
                    return Game.getObjectById(e)
                }).filter(e => e)

                if (structureName === 'LINK') {
                    STRUCTURE_TEAMS = STRUCTURE_TEAMS.filter(structure => {
                        return structure && controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'MAIN') && structure.store.getUsedCapacity([RESOURCE_ENERGY]) > 0 && !controllerMemory.getSTRUCTURE_TEAMSvalueByKeyAndID(roomName, STRUCTURE_LINK, controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'TARGET')[0], 'ISEMPTY')
                    });

                } else if (structureName === 'TERMINAL') {
                    if (STRUCTURE_TEAMS.length) {
                        var structure = STRUCTURE_TEAMS[0]
                        if (controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'COVER') || !(!controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'TARGET') && !controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'ORDER_ID') && structure.store.getUsedCapacity() > 0)) {
                            STRUCTURE_TEAMS = []
                        }
                    } else
                        STRUCTURE_TEAMS = []
                }

                controllerMemory.setMOVE_OUT(roomName, structureName, STRUCTURE_TEAMS)
            }

            // 人口控制
            // structure
            // mineral
            var MINERAL_LIST = controllerMemory.getSTRUCTURE_TEAMS(roomName, 'MINERAL')
            for (var mineralID in MINERAL_LIST) {
                var mineral = Game.getObjectById(mineralID)
                if (mineral.mineralAmount == 0) {
                    controllerMemory.setSTRUCTURE_TEAMSvalueByKeyAndID(roomName, 'MINERAL', mineralID, 'WORKER_NUMBER', 0)
                } else if (mineral.mineralAmount != 0) {
                    controllerMemory.setSTRUCTURE_TEAMSvalueByKeyAndID(roomName, 'MINERAL', mineralID, 'WORKER_NUMBER', 1)
                }
            }

            // creeps
            // harvester
            if (controllerMemory.getRESERVE_OR_CONTROL(roomName) !== 'ATTACK') {

                var WORKER_NUMBER = 0
                var SOURCE_LIST = controllerMemory.getSTRUCTURE_TEAMS(roomName, 'SOURCE')

                for (var sourceID in SOURCE_LIST) {
                    WORKER_NUMBER += SOURCE_LIST[sourceID]['WORKER_NUMBER']
                }

                controllerMemory.setCREEP_TEAMSvalueByKey(roomName, 'HARVESTER', 'NUMBER', WORKER_NUMBER)
            }

            // miner
            if (controllerMemory.getRESERVE_OR_CONTROL(roomName) === 'CONTROL') {
                // 优先判定角色是否定义
                if ('MINER' in controllerMemory.getCREEP_TEAMS(roomName)) {

                    var SOURCE_TEAMS = controllerMemory.getSTRUCTURE_TEAMS(roomName, 'MINERAL')

                    var ID = null
                    for (var mineralID in SOURCE_TEAMS) {
                        ID = mineralID
                    }

                    controllerMemory.setCREEP_TEAMSvalueByKey(roomName, 'MINER', 'NUMBER', controllerMemory.getSTRUCTURE_TEAMSvalueByKeyAndID(roomName, 'MINERAL', ID, 'WORKER_NUMBER'))

                }

            }

            // UPGRADER


            // BUILDER
            if (controllerMemory.getRESERVE_OR_CONTROL(roomName) !== 'ATTACK') {
                // 优先判定角色是否定义
                if ('BUILDER' in controllerMemory.getCREEP_TEAMS(roomName)) {
                    var CONSTRUCTION_SITE = controllerMemory.getCONSTRUCTION_SITE(roomName)

                    if (CONSTRUCTION_SITE.length > 9) {
                        controllerMemory.setCREEP_TEAMSvalueByKey(roomName, 'BUILDER', 'NUMBER', 2)
                    } else if (CONSTRUCTION_SITE.length > 0) {
                        controllerMemory.setCREEP_TEAMSvalueByKey(roomName, 'BUILDER', 'NUMBER', 1)
                    } else if (!CONSTRUCTION_SITE.length) {
                        controllerMemory.setCREEP_TEAMSvalueByKey(roomName, 'BUILDER', 'NUMBER', 0)
                    }
                }
            }

            // RESERVER
            if (controllerMemory.getRESERVE_OR_CONTROL(roomName) !== 'ATTACK') {
                // 优先判定角色是否定义
                if ('RESERVER' in controllerMemory.getCREEP_TEAMS(roomName)) {

                    // 判定房间是否可见
                    if (Game.rooms[roomName] && typeof (Game.rooms[roomName].controller.reservation) !== 'undefined' && Game.rooms[roomName].controller.reservation.username === 'substance') {
                        if (Game.rooms[roomName].controller.reservation['ticksToEnd'] > 4000) {
                            controllerMemory.setCREEP_TEAMSvalueByKey(roomName, 'RESERVER', 'NUMBER', 0)
                        } else if (Game.rooms[roomName].controller.reservation['ticksToEnd'] < 3000) {
                            controllerMemory.setCREEP_TEAMSvalueByKey(roomName, 'RESERVER', 'NUMBER', 1)
                        }
                    } else {
                        controllerMemory.setCREEP_TEAMSvalueByKey(roomName, 'RESERVER', 'NUMBER', 1)
                    }
                }
            }
        }

        // DEFENDER
        if (controllerMemory.getRESERVE_OR_CONTROL(roomName) !== 'ATTACK') {
            if (controllerMemory.getRAID_MARK(roomName) || controllerMemory.getHOSTILE_STRUCTURES(roomName).length) {
                controllerMemory.setCREEP_TEAMSvalueByKey(roomName, 'DEFENDER', 'NUMBER', 1)
            } else {
                controllerMemory.setCREEP_TEAMSvalueByKey(roomName, 'DEFENDER', 'NUMBER', 0)
            }
        }
    }
}



var controllerMaintenance = {
    maintenance: function () {

        if (Game.cpu.bucket === 10000) {
            Game.cpu.generatePixel();
        }

        roomInit()
        keepPowerCreep()
        keepCreepMemory()
        keepCreep()
        keepStructure()
        roomFinalize()

    }
};

module.exports = controllerMaintenance;