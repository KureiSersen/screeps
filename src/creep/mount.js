'use strict';

module.exports = function () {
    _.assign(Creep.prototype, creepExtension)
}

const creepExtension = {
    // creep.Memory相关
    getRole() {
        return this.memory.role
    },

    setRole(role) {
        this.memory.role = role
        return OK
    },

    getAbbRole() {
        return this.memory.role.split('_')[0].toUpperCase()
    },

    getCONTROLLER_ROOM_NAME() {
        return this.memory.role.split('_')[1]
    },

    getROOM_NAME() {
        return this.memory.role.split('_')[2]
    },

    // CREEP_TEAM相关
    getNUMBER() {
        return global.init.ROOM_LIST[this.getROOM_NAME()]['CREEP_TEAMS'][this.memory.role.split('_')[0].toUpperCase()]['NUMBER']
    },

    getFACT_NUMBER() {
        return global.init.ROOM_LIST[this.getROOM_NAME()]['CREEP_TEAMS'][this.memory.role.split('_')[0].toUpperCase()]['FACT_NUMBER']
    },

    getBODY() {
        return global.init.ROOM_LIST[this.getROOM_NAME()]['CREEP_TEAMS'][this.memory.role.split('_')[0].toUpperCase()]['BODY']
    },

    getHANG_POS() {
        var HANG_POS = global.init.ROOM_LIST[this.getROOM_NAME()]['CREEP_TEAMS'][this.memory.role.split('_')[0].toUpperCase()]['HANG_POS']
        if (HANG_POS.length !== 3) {
            console.log(this.name)
            throw new Error('HANG_POS 长度错误')
        } else if (!(Number.isFinite(HANG_POS[0]) && HANG_POS[0] >= 0) || !((Number.isFinite(HANG_POS[1]) && HANG_POS[1] >= 0)))
            throw new Error('HANG_POS 位置参数错误')

        return new RoomPosition(HANG_POS[0], HANG_POS[1], HANG_POS[2])
    },

    getENERGY_SOURCE() {
        var ENERGY_SOURCE = global.init.ROOM_LIST[this.getROOM_NAME()]['CREEP_TEAMS'][this.memory.role.split('_')[0].toUpperCase()]['ENERGY_SOURCE']

        if (ENERGY_SOURCE.length) {
            var ENERGY_SOURCE_STRUCTURE = Game.getObjectById(ENERGY_SOURCE[0])

            if (!ENERGY_SOURCE_STRUCTURE)
                return [ENERGY_SOURCE_STRUCTURE]

            if (ENERGY_SOURCE_STRUCTURE.structureType === STRUCTURE_LINK) {
                if (ENERGY_SOURCE_STRUCTURE.store.getUsedCapacity([RESOURCE_ENERGY]) > 0)
                    return [ENERGY_SOURCE_STRUCTURE]
            } else if (ENERGY_SOURCE_STRUCTURE.store.getUsedCapacity() > 0) {
                return [ENERGY_SOURCE_STRUCTURE]
            }
        }

        return []

    },

    getENERGY_DESTINATION() {
        var ENERGY_DESTINATION = global.init.ROOM_LIST[this.getROOM_NAME()]['CREEP_TEAMS'][this.memory.role.split('_')[0].toUpperCase()]['ENERGY_DESTINATION']

        if (ENERGY_DESTINATION.length) {
            var ENERGY_DESTINATION_STRUCTURE = Game.getObjectById(ENERGY_DESTINATION[0])

            return [ENERGY_DESTINATION_STRUCTURE]
        }

        return []
    },

    seria(pos) {
        return pos.x.toString() + '_' + pos.y.toString() + '_' + pos.roomName
    },

    deseria(str) {
        var temp = str.split('_')
        return new RoomPosition(temp[0], temp[1], temp[2])
    },

    getRoute(roomName) {
        var controllerMemory = require('./controller.memory')

        var route = controllerMemory.getGlobalRoute(this.room.name, roomName)
        if (!route) {
            var ALLOW_ROOM_LIST = global.init.ALLOW_ROOM_LIST
            var routeList = Game.map.findRoute(this.room.name, roomName, {
                routeCallback(roomName) {
                    let parsed = /^[WE]([0-9]+)[NS]([0-9]+)$/.exec(roomName);
                    let isHighway = (parsed[1] % 10 === 0) ||
                        (parsed[2] % 10 === 0);
                    let isMyRoom = Game.rooms[roomName] &&
                        Game.rooms[roomName].controller &&
                        Game.rooms[roomName].controller.my;
                    let customize = ALLOW_ROOM_LIST.includes(roomName)
                    if (isHighway || isMyRoom || customize) {
                        return 1;
                    } else {
                        return 2.5;
                    }
                }
            });

            var roomNameNow = this.room.name
            for (var elem of routeList) {
                controllerMemory.setGlobalRoute(roomNameNow, elem.room, elem.exit)
                controllerMemory.setGlobalRoute(roomNameNow, roomName, elem.exit)
                roomNameNow = elem.room
            }

            route = controllerMemory.getGlobalRoute(this.room.name, roomName)
        }
        return route
    },

    getExit(route) {
        var controllerMemory = require('./controller.memory')

        var exit = controllerMemory.getGlobalExit(this.room.name, route)

        if (!exit) {
            controllerMemory.setGlobalExit(this.room.name, route, Game.rooms[this.room.name].find(route))
            exit = controllerMemory.getGlobalExit(this.room.name, route)
        }

        return exit
    },

    getPath(pos) {
        var controllerMemory = require('./controller.memory')

        var path = controllerMemory.getGlobalPath(this.seria(this.pos), this.seria(pos))

        if (!path) {
            path = this.pos.findPathTo(pos, {
                maxRooms: 1,
                ignoreCreeps: true,
            })

            var step = this.seria(this.pos)
            while (path.length) {
                controllerMemory.setGlobalPath(step, this.seria(pos), [].concat(JSON.parse(JSON.stringify(path))))
                controllerMemory.setGlobalPath(step, path[0].x.toString() + '_' + path[0].y.toString() + '_' + this.room.name, [path[0]])
                var temp = path.shift()
                step = temp.x.toString() + '_' + temp.y.toString() + '_' + this.room.name
            }

            path = controllerMemory.getGlobalPath(this.seria(this.pos), this.seria(pos))

        }

        return path

    },



    myMoveTo(target) {
        /**
         * 关于myMoveTo的新思路
         * 必须确定：
         * 1.target必须不为空
         * 2.target接受pos或者包含pos的object
         * 
         * 移动思路
         * 1.获取房间找rout
         * 2.获取exit
         * 3.获取path
         * 2.确定房间与target是否一致
         * 
         */
        var controllerMovement = require('./controller.movement')

        if (!target)
            return 0

        var pos = null
        if ('pos' in target) {
            pos = target.pos
        } else if ('x' in target) {
            pos = target
        }

        var roomName = pos.roomName
        var path = null

        if (roomName !== this.room.name) {
            var route = this.getRoute(roomName)
            var exit = this.getExit(route)
            var pos = controllerMovement.findClosestByRange(this, exit)
            path = this.getPath(pos)

        } else if (roomName === this.room.name) {
            path = this.getPath(pos)
        }

        this.moveByPath(path)

        // 绘制路径
        new RoomVisual(this.room.name).poly(path, {
            stroke: '#ffffff', strokeWidth: .15,
            opacity: .4, lineStyle: 'dashed'
        });
        return OK
    },

    myMoveToRoom(roomName) {
        var controllerMovement = require('./controller.movement')
        var route = this.getRoute(roomName)
        var exit = this.getExit(route)
        var pos = controllerMovement.findClosestByRange(this, exit)
        this.myMoveTo(pos)
        return 0
    },

    setWorkingMark() {
        if (!this.memory.working && this.store.getFreeCapacity() == 0) {
            this.memory.working = true;
        }

        if (arguments.length === 0) {
            if (this.memory.working && this.store.getUsedCapacity() == 0) {
                this.memory.working = false;
            }
        } else if (arguments.length === 1) {
            if (this.memory.working && this.store.getUsedCapacity([arguments[0]]) == 0) {
                this.memory.working = false;
            }
        }
    },

    assignMark(dict) {
        var controllerMemory = require('./controller.memory')
        // var dict = {'0':1, '1':1}
        for (var mark in dict) {
            if (dict[mark] > controllerMemory.getCREEP_MEMORY_MARK_NUM(this.getROOM_NAME(), this.getRole(), 'mark', mark)) {
                if (!this.memory.mark) {
                    this.memory.mark = mark
                }
            } else if (dict[mark] < controllerMemory.getCREEP_MEMORY_MARK_NUM(this.getROOM_NAME(), this.getRole(), 'mark', mark)) {

                if (this.memory.mark) {
                    delete Memory.creeps[this.name].mark;
                }
            }
        }
    },

    transferAll(target) {
        if (this.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_POWER) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_OXYGEN) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_UTRIUM) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_LEMERGIUM) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_KEANIUM) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_ZYNTHIUM) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_CATALYST) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_GHODIUM) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_SILICON) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_METAL) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_BIOMASS) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_MIST) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_HYDROXIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_ZYNTHIUM_KEANITE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_UTRIUM_LEMERGITE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_UTRIUM_HYDRIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_UTRIUM_OXIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_KEANIUM_HYDRIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_KEANIUM_OXIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_LEMERGIUM_HYDRIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_LEMERGIUM_OXIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_ZYNTHIUM_HYDRIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_ZYNTHIUM_OXIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_GHODIUM_HYDRIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_GHODIUM_OXIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_UTRIUM_ACID) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_UTRIUM_ALKALIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_KEANIUM_ACID) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_KEANIUM_ALKALIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_LEMERGIUM_ACID) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_LEMERGIUM_ALKALIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_ZYNTHIUM_ACID) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_ZYNTHIUM_ALKALIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_GHODIUM_ACID) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_GHODIUM_ALKALIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_CATALYZED_UTRIUM_ACID) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_CATALYZED_UTRIUM_ALKALIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_CATALYZED_KEANIUM_ACID) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_CATALYZED_KEANIUM_ALKALIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_CATALYZED_LEMERGIUM_ACID) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_CATALYZED_ZYNTHIUM_ACID) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_CATALYZED_GHODIUM_ACID) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_CATALYZED_GHODIUM_ALKALIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_OPS) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_UTRIUM_BAR) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_LEMERGIUM_BAR) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_ZYNTHIUM_BAR) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_KEANIUM_BAR) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_GHODIUM_MELT) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_OXIDANT) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_REDUCTANT) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_PURIFIER) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_BATTERY) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_COMPOSITE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_CRYSTAL) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_LIQUID) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_WIRE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_SWITCH) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_TRANSISTOR) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_MICROCHIP) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_CIRCUIT) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_DEVICE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_CELL) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_PHLEGM) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_TISSUE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_MUSCLE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_ORGANOID) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_ORGANISM) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_ALLOY) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_TUBE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_FIXTURES) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_FRAME) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_HYDRAULICS) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_MACHINE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_CONDENSATE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_CONCENTRATE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_EXTRACT) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_SPIRIT) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_EMANATION) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.transfer(target, RESOURCE_ESSENCE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)

    },

    withdrawAll(target) {
        if (this.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_POWER) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_OXYGEN) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_UTRIUM) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_LEMERGIUM) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_KEANIUM) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_ZYNTHIUM) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_CATALYST) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_GHODIUM) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_SILICON) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_METAL) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_BIOMASS) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_MIST) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_HYDROXIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_ZYNTHIUM_KEANITE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_UTRIUM_LEMERGITE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_UTRIUM_HYDRIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_UTRIUM_OXIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_KEANIUM_HYDRIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_KEANIUM_OXIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_LEMERGIUM_HYDRIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_LEMERGIUM_OXIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_ZYNTHIUM_HYDRIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_ZYNTHIUM_OXIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_GHODIUM_HYDRIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_GHODIUM_OXIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_UTRIUM_ACID) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_UTRIUM_ALKALIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_KEANIUM_ACID) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_KEANIUM_ALKALIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_LEMERGIUM_ACID) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_LEMERGIUM_ALKALIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_ZYNTHIUM_ACID) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_ZYNTHIUM_ALKALIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_GHODIUM_ACID) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_GHODIUM_ALKALIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_CATALYZED_UTRIUM_ACID) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_CATALYZED_UTRIUM_ALKALIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_CATALYZED_KEANIUM_ACID) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_CATALYZED_KEANIUM_ALKALIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_CATALYZED_LEMERGIUM_ACID) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_CATALYZED_ZYNTHIUM_ACID) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_CATALYZED_GHODIUM_ACID) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_CATALYZED_GHODIUM_ALKALIDE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_OPS) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_UTRIUM_BAR) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_LEMERGIUM_BAR) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_ZYNTHIUM_BAR) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_KEANIUM_BAR) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_GHODIUM_MELT) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_OXIDANT) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_REDUCTANT) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_PURIFIER) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_BATTERY) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_COMPOSITE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_CRYSTAL) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_LIQUID) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_WIRE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_SWITCH) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_TRANSISTOR) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_MICROCHIP) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_CIRCUIT) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_DEVICE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_CELL) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_PHLEGM) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_TISSUE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_MUSCLE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_ORGANOID) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_ORGANISM) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_ALLOY) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_TUBE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_FIXTURES) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_FRAME) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_HYDRAULICS) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_MACHINE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_CONDENSATE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_CONCENTRATE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_EXTRACT) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_SPIRIT) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_EMANATION) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
        else if (this.withdraw(target, RESOURCE_ESSENCE) === ERR_NOT_IN_RANGE)
            this.myMoveTo(target)
    },
}