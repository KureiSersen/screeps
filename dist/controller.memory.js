'use strict';
var controllerMemory = {
    // 针对ROOM的内存操作
    getCONTROLLER_ROOM_NAME: function (roomName) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        return global.init.ROOM_LIST[roomName].CONTROLLER_ROOM_NAME
    },

    getRESERVE_OR_CONTROL: function (roomName) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        return global.init.ROOM_LIST[roomName].RESERVE_OR_CONTROL
    },

    setRESERVE_OR_CONTROL: function (roomName, RESERVE_OR_CONTROL) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        const RESERVE_OR_CONTROL_LIST = ['CONTROL', 'RESERVE', 'ATTACK']
        if (!RESERVE_OR_CONTROL_LIST.includes(RESERVE_OR_CONTROL))
            throw new Error('RESERVE_OR_CONTROL 应在 CONTROL、RESERVE、ATTACK 中定义')

        global.init.ROOM_LIST[roomName].RESERVE_OR_CONTROL = RESERVE_OR_CONTROL
        return OK
    },

    getWALL_RAMPART_HITS: function (roomName) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        return global.init.ROOM_LIST[roomName].WALL_RAMPART_HITS
    },

    setWALL_RAMPART_HITS: function (roomName, WALL_RAMPART_HITS) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        if (!(Number.isFinite(WALL_RAMPART_HITS) && WALL_RAMPART_HITS >= 0))
            return '墙壁血量定义错误'

        global.init.ROOM_LIST[roomName].WALL_RAMPART_HITS = WALL_RAMPART_HITS
        return OK
    },

    getRAID_MARK: function (roomName) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        return global.init.ROOM_LIST[roomName].RAID_MARK
    },

    setRAID_MARK: function (roomName, RAID_MARK) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        if (!(typeof RAID_MARK === 'boolean'))
            throw new Error('RAID_MARK 错误')

        global.init.ROOM_LIST[roomName].RAID_MARK = RAID_MARK
        return OK
    },

    getREFUGE: function (roomName) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        var REFUGE = global.init.ROOM_LIST[roomName].REFUGE
        return new RoomPosition(REFUGE[0], REFUGE[1], REFUGE[2])
    },

    setREFUGE: function (roomName, REFUGE) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        if (REFUGE.length !== 3)
            throw new Error('REFUGE 长度错误')
        else if (!(Number.isFinite(REFUGE[0]) && REFUGE[0] >= 0) || !((Number.isFinite(REFUGE[1]) && REFUGE[1] >= 0)))
            throw new Error('REFUGE 位置参数错误')
        else if (!(REFUGE[2] !== global.init.ROOM_LIST[roomName].CONTROLLER_ROOM_NAME))
            throw new Error('REFUGE 房间参数错误')

        global.init.ROOM_LIST[roomName].REFUGE = REFUGE
        return OK
    },

    getCREEP_MEMORY_MARK_NUM: function (roomName, roleName, mark, key) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        if (!(roleName in global.init.ROOM_LIST[roomName].CREEP_MEMORY_MARK_NUM))
            return 0

        if (!(mark in global.init.ROOM_LIST[roomName].CREEP_MEMORY_MARK_NUM[roleName]))
            return 0

        if (!(key in global.init.ROOM_LIST[roomName].CREEP_MEMORY_MARK_NUM[roleName][mark]))
            return 0

        return global.init.ROOM_LIST[roomName].CREEP_MEMORY_MARK_NUM[roleName][mark][key]
    },

    setCREEP_MEMORY_MARK_NUM: function (roomName, roleName, mark, key, value) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        if (roleName === '' && mark === '' && key === '' && value === '')
            global.init.ROOM_LIST[roomName].CREEP_MEMORY_MARK_NUM = {}
        else {
            if (!(roleName in global.init.ROOM_LIST[roomName].CREEP_MEMORY_MARK_NUM))
                global.init.ROOM_LIST[roomName].CREEP_MEMORY_MARK_NUM[roleName] = {}

            if (!(mark in global.init.ROOM_LIST[roomName].CREEP_MEMORY_MARK_NUM[roleName]))
                global.init.ROOM_LIST[roomName].CREEP_MEMORY_MARK_NUM[roleName][mark] = {}

            global.init.ROOM_LIST[roomName].CREEP_MEMORY_MARK_NUM[roleName][mark][key] = value
        }
        return OK
    },

    getHOSTILE_CREEPS: function (roomName) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        return global.init.ROOM_LIST[roomName].HOSTILE_CREEPS
    },

    setHOSTILE_CREEPS: function (roomName, HOSTILE_CREEPS) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        global.init.ROOM_LIST[roomName].HOSTILE_CREEPS = HOSTILE_CREEPS
        return OK
    },

    getHOSTILE_STRUCTURES: function (roomName) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        return global.init.ROOM_LIST[roomName].HOSTILE_STRUCTURES
    },

    setHOSTILE_STRUCTURES: function (roomName, HOSTILE_STRUCTURES) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        global.init.ROOM_LIST[roomName].HOSTILE_STRUCTURES = HOSTILE_STRUCTURES
        return OK
    },

    getMY_CREEPS_NEED_HEAL: function (roomName) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        return global.init.ROOM_LIST[roomName].MY_CREEPS_NEED_HEAL
    },

    setMY_CREEPS_NEED_HEAL: function (roomName, MY_CREEPS_NEED_HEAL) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        global.init.ROOM_LIST[roomName].MY_CREEPS_NEED_HEAL = MY_CREEPS_NEED_HEAL
        return OK
    },

    getSTRUCTURES_NEED_REPAIR: function (roomName) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        return global.init.ROOM_LIST[roomName].STRUCTURES_NEED_REPAIR
    },

    setSTRUCTURES_NEED_REPAIR: function (roomName, STRUCTURES_NEED_REPAIR) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        global.init.ROOM_LIST[roomName].STRUCTURES_NEED_REPAIR = STRUCTURES_NEED_REPAIR
        return OK
    },

    getCONSTRUCTION_SITE: function (roomName) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        return global.init.ROOM_LIST[roomName].CONSTRUCTION_SITE
    },

    setCONSTRUCTION_SITE: function (roomName, CONSTRUCTION_SITE) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        global.init.ROOM_LIST[roomName].CONSTRUCTION_SITE = CONSTRUCTION_SITE
        return OK
    },

    getRUIN_WITH_SOURCE: function (roomName) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        return global.init.ROOM_LIST[roomName].RUIN_WITH_SOURCE
    },

    setRUIN_WITH_SOURCE: function (roomName, RUIN_WITH_SOURCE) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        global.init.ROOM_LIST[roomName].RUIN_WITH_SOURCE = RUIN_WITH_SOURCE
        return OK
    },

    getTOMBSTONE_WITH_SOURCE: function (roomName) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        return global.init.ROOM_LIST[roomName].TOMBSTONE_WITH_SOURCE
    },

    setTOMBSTONE_WITH_SOURCE: function (roomName, TOMBSTONE_WITH_SOURCE) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        global.init.ROOM_LIST[roomName].TOMBSTONE_WITH_SOURCE = TOMBSTONE_WITH_SOURCE
        return OK
    },

    getDROPPED_SOURCE: function (roomName) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        return global.init.ROOM_LIST[roomName].DROPPED_SOURCE
    },

    setDROPPED_SOURCE: function (roomName, DROPPED_SOURCE) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        global.init.ROOM_LIST[roomName].DROPPED_SOURCE = DROPPED_SOURCE
        return OK
    },

    getSEND_IN: function (roomName, structureName) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        if (structureName !== '' && !(structureName in global.init.ROOM_LIST[roomName]['SEND_IN']))
            throw new Error('建筑名称错误')

        if (structureName === '')
            return global.init.ROOM_LIST[roomName]['SEND_IN']

        return global.init.ROOM_LIST[roomName]['SEND_IN'][structureName]
    },

    setSEND_IN: function (roomName, structureName, value) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        if (!(structureName in global.init.ROOM_LIST[roomName]['SEND_IN']))
            throw new Error('建筑名称错误')

        global.init.ROOM_LIST[roomName]['SEND_IN'][structureName] = value
        return OK
    },

    getMOVE_OUT: function (roomName, structureName) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        if (structureName !== '' && !(structureName in global.init.ROOM_LIST[roomName]['MOVE_OUT']))
            throw new Error('建筑名称错误')

        if (structureName === '')
            return global.init.ROOM_LIST[roomName]['MOVE_OUT']

        return global.init.ROOM_LIST[roomName]['MOVE_OUT'][structureName]
    },

    setMOVE_OUT: function (roomName, structureName, value) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        if (!(structureName in global.init.ROOM_LIST[roomName]['MOVE_OUT']))
            throw new Error('建筑名称错误')

        global.init.ROOM_LIST[roomName]['MOVE_OUT'][structureName] = value
        return OK
    },

    getCREEP_TEAMS: function (roomName) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        return global.init.ROOM_LIST[roomName]['CREEP_TEAMS']
    },

    getCREEP_TEAMSbyRole: function (roomName, role) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        if (!(role in global.init.ROOM_LIST[roomName]['CREEP_TEAMS']))
            throw new Error('creep角色未定义')

        return global.init.ROOM_LIST[roomName]['CREEP_TEAMS'][role]
    },

    getCREEP_TEAMSbyKey: function (roomName, role, key) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        if (!(role in global.init.ROOM_LIST[roomName]['CREEP_TEAMS']))
            throw new Error('creep角色未定义')

        if (!(key in global.init.ROOM_LIST[roomName]['CREEP_TEAMS'][role]))
            throw new Error('键名未在角色中定义')

        return global.init.ROOM_LIST[roomName]['CREEP_TEAMS'][role][key]
    },

    setCREEP_TEAMSvalueByKey: function (roomName, role, key, value) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        if (!(role in global.init.ROOM_LIST[roomName]['CREEP_TEAMS']))
            throw new Error('creep角色未定义')

        if (!(key in global.init.ROOM_LIST[roomName]['CREEP_TEAMS'][role]))
            throw new Error('键名未在角色中定义')

        global.init.ROOM_LIST[roomName]['CREEP_TEAMS'][role][key] = value
        return OK
    },

    getSTRUCTURE_TEAMS: function (roomName, structureType) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        return global.init.ROOM_LIST[roomName]['STRUCTURE_TEAMS'][structureType.toUpperCase()]
    },

    getSTRUCTURE_TEAMSbyID: function (roomName, structureType, ID) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        if (!(ID in global.init.ROOM_LIST[roomName]['STRUCTURE_TEAMS'][structureType.toUpperCase()]))
            throw new Error('建筑物ID或建筑物种类错误')

        return global.init.ROOM_LIST[roomName]['STRUCTURE_TEAMS'][structureType.toUpperCase()][ID]
    },

    getSTRUCTURE_TEAMSvalueByKeyAndID: function (roomName, structureType, ID, key) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        if (!(ID in global.init.ROOM_LIST[roomName]['STRUCTURE_TEAMS'][structureType.toUpperCase()])) {
            console.log(roomName, structureType, ID, key, global.init.ROOM_LIST[roomName]['STRUCTURE_TEAMS'][structureType.toUpperCase()])
            throw new Error('建筑物ID或建筑物种类错误')
        }

        if (!(key in global.init.ROOM_LIST[roomName]['STRUCTURE_TEAMS'][structureType.toUpperCase()][ID]))
            throw new Error('键名未在建筑中定义')

        return global.init.ROOM_LIST[roomName]['STRUCTURE_TEAMS'][structureType.toUpperCase()][ID][key]
    },

    setSTRUCTURE_TEAMSvalueByKeyAndID: function (roomName, structureType, ID, key, value) {
        if (!(roomName in global.init.ROOM_LIST))
            throw new Error('房间名称错误')

        if (!(ID in global.init.ROOM_LIST[roomName]['STRUCTURE_TEAMS'][structureType.toUpperCase()]))
            throw new Error('建筑物ID或建筑物种类错误')

        if (!(key in global.init.ROOM_LIST[roomName]['STRUCTURE_TEAMS'][structureType.toUpperCase()][ID]))
            throw new Error('键名未在建筑中定义')

        global.init.ROOM_LIST[roomName]['STRUCTURE_TEAMS'][structureType.toUpperCase()][ID][key] = value
        return OK
    },


    getSTRUCTURE_TEAMSvalueByKey: function (structure, key) {
        if (!(structure.structureType.toUpperCase() in global.init.ROOM_LIST[structure.room.name]['STRUCTURE_TEAMS']))
            throw new Error('建筑种类未注册')

        if (!(structure.id in global.init.ROOM_LIST[structure.room.name]['STRUCTURE_TEAMS'][structure.structureType.toUpperCase()]))
            throw new Error('建筑ID未注册')

        if (!(key in global.init.ROOM_LIST[structure.room.name]['STRUCTURE_TEAMS'][structure.structureType.toUpperCase()][structure.id]))
            throw new Error('键名未在建筑中定义')

        return global.init.ROOM_LIST[structure.room.name]['STRUCTURE_TEAMS'][structure.structureType.toUpperCase()][structure.id][key]
    },

    setSTRUCTURE_TEAMSvalueByKey: function (structure, key, value) {
        var structureType = structure.structureType
        if (!(structureType.toUpperCase() in global.init.ROOM_LIST[structure.room.name]['STRUCTURE_TEAMS']))
            throw new Error('建筑种类未注册')

        if (!(structure.id in global.init.ROOM_LIST[structure.room.name]['STRUCTURE_TEAMS'][structureType.toUpperCase()]))
            throw new Error('建筑ID未注册')

        if (!(key in global.init.ROOM_LIST[structure.room.name]['STRUCTURE_TEAMS'][structureType.toUpperCase()][structure.id]))
            throw new Error('键名未在建筑中定义')

        global.init.ROOM_LIST[structure.room.name]['STRUCTURE_TEAMS'][structureType.toUpperCase()][structure.id][key] = value
        return OK
    },


    // 针对global内存操作
    getGlobalRoute: function (fromRoomName, toRoomName) {
        if (fromRoomName in global.route) {
            if (toRoomName in global.route[fromRoomName]) {
                return global.route[fromRoomName][toRoomName]
            }
        }

        return null
    },

    setGlobalRoute: function (fromRoomName, toRoomName, value) {
        if (!(fromRoomName in global.route)) {
            global.route[fromRoomName] = {}
        }

        if (!(toRoomName in global.route[fromRoomName]) && value) {
            global.route[fromRoomName][toRoomName] = value
        }

        return OK
    },

    getGlobalExit: function (roomName, exit) {
        if (roomName in global.exit) {
            if (exit in global.exit[roomName]) {
                return global.exit[roomName][exit]
            }
        }

        return null
    },

    setGlobalExit: function (roomName, exit, value) {
        if (!(roomName in global.exit)) {
            global.exit[roomName] = {}
        }

        if (!(exit in global.exit[roomName]) && value) {
            global.exit[roomName][exit] = value
        }

        return OK
    },

    getGlobalPath: function (fromPos, toPos) {
        if (fromPos in global.path) {
            if (toPos in global.path[fromPos]) {

                return global.path[fromPos][toPos]
            }
        }

        return null
    },

    setGlobalPath: function (fromPos, toPos, value) {
        if (!(fromPos in global.path)) {
            global.path[fromPos] = {}
        }

        global.path[fromPos][toPos] = value

        return OK
    },
};

module.exports = controllerMemory;
