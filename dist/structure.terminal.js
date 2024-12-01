'use strict';

var controllerMemory = require('./controller.memory')

function send(structure) {
    var COAST = controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'COAST')
    var ORDER_CONTENT = controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'ORDER_CONTENT')
    var transferTarget = Game.getObjectById(controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'TARGET'))

    var totalAmount = 0
    var RESOURCE = ''
    var flag = true
    for (var RESOURCES_TYPE in ORDER_CONTENT) {
        if (ORDER_CONTENT[RESOURCES_TYPE] > structure.store.getUsedCapacity(RESOURCES_TYPE)) {
            flag = false
            break
        }

        if (RESOURCES_TYPE === RESOURCE_ENERGY && ORDER_CONTENT[RESOURCE_ENERGY] != COAST)
            totalAmount = ORDER_CONTENT[RESOURCE_ENERGY] - COAST
        else
            totalAmount = ORDER_CONTENT[RESOURCES_TYPE]

        RESOURCE = RESOURCES_TYPE
    }

    if (flag && transferTarget.store.getFreeCapacity() >= totalAmount) {
        if (structure.send(RESOURCE, totalAmount, transferTarget.room.name) === OK) {
            controllerMemory.setSTRUCTURE_TEAMSvalueByKey(structure, 'ORDER_ID', '')
            controllerMemory.setSTRUCTURE_TEAMSvalueByKey(structure, 'TARGET', '')
            controllerMemory.setSTRUCTURE_TEAMSvalueByKey(structure, 'COAST', '')
            controllerMemory.setSTRUCTURE_TEAMSvalueByKey(structure, 'ORDER_CONTENT', {})
        }
    }
}


function deal(structure) {
    var COAST = controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'COAST')
    var ORDER_ID = controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'ORDER_ID')
    var ORDER_CONTENT = controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'ORDER_CONTENT')
    var RESOURCE = ''
    var flag = true

    for (var RESOURCES_TYPE in ORDER_CONTENT) {
        if (ORDER_CONTENT[RESOURCES_TYPE] > structure.store.getUsedCapacity(RESOURCES_TYPE)) {
            flag = false
            break
        }

        if (RESOURCES_TYPE === RESOURCE_ENERGY && ORDER_CONTENT[RESOURCE_ENERGY] != COAST)
            ORDER_CONTENT[RESOURCE_ENERGY] = COAST

        RESOURCE = RESOURCES_TYPE

    }
    if (flag) {
        if (Game.market.deal(ORDER_ID, ORDER_CONTENT[RESOURCE], structure.room.name) === OK) {
            controllerMemory.setSTRUCTURE_TEAMSvalueByKey(structure, 'ORDER_ID', '')
            controllerMemory.setSTRUCTURE_TEAMSvalueByKey(structure, 'TARGET', '')
            controllerMemory.setSTRUCTURE_TEAMSvalueByKey(structure, 'COAST', '')
            controllerMemory.setSTRUCTURE_TEAMSvalueByKey(structure, 'ORDER_CONTENT', {})
        } else if (Game.market.deal(ORDER_ID, ORDER_CONTENT[RESOURCE], structure.room.name) === ERR_INVALID_ARGS) {
            controllerMemory.setSTRUCTURE_TEAMSvalueByKey(structure, 'ORDER_ID', '')
            controllerMemory.setSTRUCTURE_TEAMSvalueByKey(structure, 'TARGET', '')
            controllerMemory.setSTRUCTURE_TEAMSvalueByKey(structure, 'COAST', '')
            controllerMemory.setSTRUCTURE_TEAMSvalueByKey(structure, 'ORDER_CONTENT', {})
            console.log('目标order已变更,容量不足无法交易')
        }
    }
}

function cover(structure) {
    var ORDER_CONTENT = controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'ORDER_CONTENT')

    var flag = true

    for (var RESOURCES_TYPE in ORDER_CONTENT) {
        if (ORDER_CONTENT[RESOURCES_TYPE] > structure.store.getUsedCapacity(RESOURCES_TYPE)) {
            flag = false
            break
        }
    }

    if(flag){
        controllerMemory.setSTRUCTURE_TEAMSvalueByKey(structure, 'ORDER_ID', '')
        controllerMemory.setSTRUCTURE_TEAMSvalueByKey(structure, 'ORDER_CONTENT', {})
    }

}

var structureTerminal = {
    terminal: function (structure) {
        if (!controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'COVER')) {
            if (controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'TARGET')) {
                send(structure)
            } else if (controllerMemory.getSTRUCTURE_TEAMSvalueByKey(structure, 'ORDER_ID')) {
                deal(structure)
            }
        } else
            cover(structure)
    },
}

module.exports = structureTerminal;