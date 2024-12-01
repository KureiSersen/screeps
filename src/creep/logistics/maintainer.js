'use strict';

var controllerMemory = require('./controller.memory')

function sendIn(creep, target, RESOURCES_TYPE, ENERGY_SOURCE, ENERGY_DESTINATION) {
    creep.setWorkingMark(RESOURCES_TYPE)
    if (!creep.memory.working) {
        // 先清空，再获取资源
        if (creep.store.getUsedCapacity() > 0) {
            creep.transferAll(ENERGY_DESTINATION)
        } else {
            if (creep.withdraw(ENERGY_SOURCE, RESOURCES_TYPE) === ERR_NOT_IN_RANGE)
                creep.myMoveTo(ENERGY_SOURCE)
        }
    } else {
        // 有资源
        if (creep.transfer(target, RESOURCES_TYPE) === ERR_NOT_IN_RANGE)
            creep.myMoveTo(target)
    }
}


function moveOut(creep, target, ENERGY_DESTINATION) {
    creep.setWorkingMark()

    if (!creep.memory.working) {
        // 无资源
        creep.withdrawAll(target)
    } else {
        // 有资源
        creep.transferAll(ENERGY_DESTINATION)
    }
}



var creepLogisticsMaintainer = {
    // 维持者
    maintainer: function (creep) {
        // 拿到工作目标
        var SEND_IN = controllerMemory.getSEND_IN(creep.getROOM_NAME(), '')

        var MOVE_OUT = controllerMemory.getMOVE_OUT(creep.getROOM_NAME(), '')

        // 顺序标记
        creep.assignMark({ '0': 1, '1': 1 })

        var ENERGY_SOURCE = creep.getENERGY_SOURCE()[0]
        var ENERGY_DESTINATION = creep.getENERGY_DESTINATION()[0]

        if (!ENERGY_SOURCE || ENERGY_SOURCE.store.getUsedCapacity([RESOURCE_ENERGY]) < 1000) {
            var TerminalID = null
            for (var temp in controllerMemory.getSTRUCTURE_TEAMS(creep.getROOM_NAME(), STRUCTURE_TERMINAL)) {
                TerminalID = temp
            }

            if (TerminalID)
                TerminalID = Game.getObjectById(TerminalID)

            if (TerminalID && TerminalID.store.getUsedCapacity([RESOURCE_ENERGY]) > 0)
                ENERGY_SOURCE = TerminalID
            else {
                creep.myMoveTo(creep.getHANG_POS())
                return 0
            }
        }

        if (creep.memory.mark == '0') {
            // 顺序进行

            if (SEND_IN['SPAWN'].length) {
                sendIn(creep, SEND_IN['SPAWN'][0], RESOURCE_ENERGY, ENERGY_SOURCE, ENERGY_DESTINATION)
            } else if (SEND_IN['EXTENSION'].length) {
                sendIn(creep, SEND_IN['EXTENSION'][0], RESOURCE_ENERGY, ENERGY_SOURCE, ENERGY_DESTINATION)
            } else if (MOVE_OUT['TERMINAL'].length) {
                moveOut(creep, MOVE_OUT['TERMINAL'][0], ENERGY_DESTINATION)
            } else if (SEND_IN['TERMINAL'].length) {
                var target = SEND_IN['TERMINAL'][0]
                var ORDER_CONTENT = controllerMemory.getSTRUCTURE_TEAMSvalueByKey(target, 'ORDER_CONTENT')
                var RESOURCE = ''

                for (var RESOURCES_TYPE in ORDER_CONTENT) {
                    if (ORDER_CONTENT[RESOURCES_TYPE] > target.store.getUsedCapacity(RESOURCES_TYPE)) {
                        RESOURCE = RESOURCES_TYPE
                        break
                    }
                }

                sendIn(creep, target, RESOURCE, ENERGY_SOURCE, ENERGY_DESTINATION)
            } else if (MOVE_OUT['LINK'].length) {
                moveOut(creep, MOVE_OUT['LINK'][0], ENERGY_DESTINATION)
            } else if (SEND_IN['LINK'].length) {
                sendIn(creep, SEND_IN['LINK'][0], RESOURCE_ENERGY, ENERGY_SOURCE, ENERGY_DESTINATION)
            } else if (SEND_IN['TOWER'].length) {
                sendIn(creep, SEND_IN['TOWER'][0], RESOURCE_ENERGY, ENERGY_SOURCE, ENERGY_DESTINATION)
            } else {
                if (SEND_IN['POWERSPAWN'].length) {
                    var target = SEND_IN['POWERSPAWN'][0]
                    var ORDER_CONTENT = controllerMemory.getSTRUCTURE_TEAMSvalueByKey(target, 'ORDER_CONTENT')
                    var RESOURCE = ''

                    for (var RESOURCES_TYPE in ORDER_CONTENT) {
                        if (ORDER_CONTENT[RESOURCES_TYPE] > target.store.getUsedCapacity(RESOURCES_TYPE)) {
                            RESOURCE = RESOURCES_TYPE
                            break
                        }
                    }

                    sendIn(creep, target, RESOURCE, ENERGY_SOURCE, ENERGY_DESTINATION)
                } else if (SEND_IN['NUKER'].length) {
                    var target = SEND_IN['NUKER'][0]
                    var ORDER_CONTENT = controllerMemory.getSTRUCTURE_TEAMSvalueByKey(target, 'ORDER_CONTENT')
                    var RESOURCE = ''

                    for (var RESOURCES_TYPE in ORDER_CONTENT) {
                        if (ORDER_CONTENT[RESOURCES_TYPE] > target.store.getUsedCapacity(RESOURCES_TYPE)) {
                            RESOURCE = RESOURCES_TYPE
                            break
                        }
                    }

                    sendIn(creep, target, RESOURCE, ENERGY_SOURCE, ENERGY_DESTINATION)
                } else {
                    // 目标为空
                    creep.myMoveTo(creep.getHANG_POS())
                }
            }

        } else if (creep.memory.mark == '1') {
            // 逆序进行

            if (SEND_IN['TOWER'].length) {
                sendIn(creep, SEND_IN['TOWER'][SEND_IN['TOWER'].length - 1], RESOURCE_ENERGY, ENERGY_SOURCE, ENERGY_DESTINATION)
            } else if (SEND_IN['LINK'].length) {
                sendIn(creep, SEND_IN['LINK'][0], RESOURCE_ENERGY, ENERGY_SOURCE, ENERGY_DESTINATION)
            } else if (MOVE_OUT['LINK'].length) {
                moveOut(creep, MOVE_OUT['LINK'][0], ENERGY_DESTINATION)
            } else if (SEND_IN['TERMINAL'].length) {
                var target = SEND_IN['TERMINAL'][0]
                var ORDER_CONTENT = controllerMemory.getSTRUCTURE_TEAMSvalueByKey(target, 'ORDER_CONTENT')
                var RESOURCE = ''

                for (var RESOURCES_TYPE in ORDER_CONTENT) {
                    if (ORDER_CONTENT[RESOURCES_TYPE] > target.store.getUsedCapacity(RESOURCES_TYPE)) {
                        RESOURCE = RESOURCES_TYPE
                        break
                    }
                }

                sendIn(creep, target, RESOURCE, ENERGY_SOURCE, ENERGY_DESTINATION)
            } else if (MOVE_OUT['TERMINAL'].length) {
                moveOut(creep, MOVE_OUT['TERMINAL'][0], ENERGY_DESTINATION)
            } else if (SEND_IN['EXTENSION'].length) {
                sendIn(creep, SEND_IN['EXTENSION'][SEND_IN['EXTENSION'].length - 1], RESOURCE_ENERGY, ENERGY_SOURCE, ENERGY_DESTINATION)
            } else if (SEND_IN['SPAWN'].length) {
                sendIn(creep, SEND_IN['SPAWN'][SEND_IN['SPAWN'].length - 1], RESOURCE_ENERGY, ENERGY_SOURCE, ENERGY_DESTINATION)
            } else {
                if (SEND_IN['NUKER'].length) {
                    var target = SEND_IN['NUKER'][0]
                    var ORDER_CONTENT = controllerMemory.getSTRUCTURE_TEAMSvalueByKey(target, 'ORDER_CONTENT')
                    var RESOURCE = ''

                    for (var RESOURCES_TYPE in ORDER_CONTENT) {
                        if (ORDER_CONTENT[RESOURCES_TYPE] > target.store.getUsedCapacity(RESOURCES_TYPE)) {
                            RESOURCE = RESOURCES_TYPE
                            break
                        }
                    }

                    sendIn(creep, target, RESOURCE, ENERGY_SOURCE, ENERGY_DESTINATION)
                } else if (SEND_IN['POWERSPAWN'].length) {
                    var target = SEND_IN['POWERSPAWN'][0]
                    var ORDER_CONTENT = controllerMemory.getSTRUCTURE_TEAMSvalueByKey(target, 'ORDER_CONTENT')
                    var RESOURCE = ''

                    for (var RESOURCES_TYPE in ORDER_CONTENT) {
                        if (ORDER_CONTENT[RESOURCES_TYPE] > target.store.getUsedCapacity(RESOURCES_TYPE)) {
                            RESOURCE = RESOURCES_TYPE
                            break
                        }
                    }

                    sendIn(creep, target, RESOURCE, ENERGY_SOURCE, ENERGY_DESTINATION)
                } else {
                    // 目标为空
                    creep.myMoveTo(creep.getHANG_POS())
                }
            }

        }
    },
}


module.exports = creepLogisticsMaintainer;