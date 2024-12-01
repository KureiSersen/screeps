'use strict';
var controllerMemory = require('./controller.memory')
var ROOM_LIST = global.init.ROOM_LIST

var controllerCommand = {
    command: function () {
        global.set = function (roomName, roleName, body, NUM) {
            // 判断房间名称是否写错
            if (!(roomName in ROOM_LIST))
                return '房间名称错误'

            if (!(roleName in controllerMemory.getCREEP_TEAMS(roomName)))
                return '角色定义错误,' + roleName + ' 角色未在房间 ' + roomName + ' 中定义,应在 DEFENDER、HARVESTER、BUILDER、UPGRADER、CARRIER、MAINTAINER、MINER 中定义'

            if (body.length) {
                var PART = [WORK, MOVE, CARRY, ATTACK, RANGED_ATTACK, HEAL, CLAIM, TOUGH]
                var bodyERR = body.filter((part) => { return !PART.includes(part) })
                if (bodyERR.length)
                    return '身体部件错误'
            }

            if (!(Number.isFinite(NUM) && NUM >= 0))
                return '数量定义错误'

            controllerMemory.setCREEP_TEAMSvalueByKey(roomName, roleName, 'NUMBER', NUM)
            if (body.length)
                controllerMemory.setCREEP_TEAMSvalueByKey(roomName, roleName, 'BODY', body)

            return 'success'
        }

        global.send = function (SEND_ROOM_NAME, RECEIVE_ROOM_NAME, RESOURCE_TYPE, AMOUNT) {
            // 判断房间名称是否写错
            if (!(SEND_ROOM_NAME in ROOM_LIST))
                return '房间名称错误'

            if (!(RECEIVE_ROOM_NAME in ROOM_LIST))
                return '房间名称错误'

            if (SEND_ROOM_NAME === RECEIVE_ROOM_NAME)
                return '发送房间与接收房间名称不应一致'

            if (!(Number.isFinite(AMOUNT) && AMOUNT >= 0))
                return '数量定义错误'

            var sendTerminalID = null
            for (var temp in controllerMemory.getSTRUCTURE_TEAMS(SEND_ROOM_NAME, STRUCTURE_TERMINAL)) {
                sendTerminalID = temp
            }

            var receiveTerminalID = null
            for (var temp in controllerMemory.getSTRUCTURE_TEAMS(RECEIVE_ROOM_NAME, STRUCTURE_TERMINAL)) {
                receiveTerminalID = temp
            }

            if (controllerMemory.getSTRUCTURE_TEAMSvalueByKeyAndID(SEND_ROOM_NAME, STRUCTURE_TERMINAL, sendTerminalID, 'ORDER_ID'))
                return '正在执行deal任务'

            controllerMemory.setSTRUCTURE_TEAMSvalueByKeyAndID(SEND_ROOM_NAME, STRUCTURE_TERMINAL, sendTerminalID, 'TARGET', receiveTerminalID)

            if (RESOURCE_TYPE === RESOURCE_ENERGY) {
                var ORDER_CONTENT = {}
                var COAST = Game.market.calcTransactionCost(AMOUNT, SEND_ROOM_NAME, RECEIVE_ROOM_NAME)
                ORDER_CONTENT[RESOURCE_ENERGY] = COAST + AMOUNT
                controllerMemory.setSTRUCTURE_TEAMSvalueByKeyAndID(SEND_ROOM_NAME, STRUCTURE_TERMINAL, sendTerminalID, 'COAST', COAST)
                controllerMemory.setSTRUCTURE_TEAMSvalueByKeyAndID(SEND_ROOM_NAME, STRUCTURE_TERMINAL, sendTerminalID, 'ORDER_CONTENT', ORDER_CONTENT)
            } else {
                var ORDER_CONTENT = {}
                var COAST = Game.market.calcTransactionCost(AMOUNT, SEND_ROOM_NAME, RECEIVE_ROOM_NAME)
                ORDER_CONTENT[RESOURCE_ENERGY] = COAST
                ORDER_CONTENT[RESOURCE_TYPE] = AMOUNT
                controllerMemory.setSTRUCTURE_TEAMSvalueByKeyAndID(SEND_ROOM_NAME, STRUCTURE_TERMINAL, sendTerminalID, 'COAST', COAST)
                controllerMemory.setSTRUCTURE_TEAMSvalueByKeyAndID(SEND_ROOM_NAME, STRUCTURE_TERMINAL, sendTerminalID, 'ORDER_CONTENT', ORDER_CONTENT)
            }

            return 'success'
        }

        global.deal = function (DEAL_ROOM_NAME, ORDER_ID, AMOUNT) {
            // 判断房间名称是否写错
            if (!(DEAL_ROOM_NAME in ROOM_LIST))
                return '房间名称错误'

            if (!(Number.isFinite(AMOUNT) && AMOUNT >= 0))
                return '数量定义错误'

            var dealTerminalID = null
            for (var temp in controllerMemory.getSTRUCTURE_TEAMS(DEAL_ROOM_NAME, STRUCTURE_TERMINAL)) {
                dealTerminalID = temp
            }

            if (controllerMemory.getSTRUCTURE_TEAMSvalueByKeyAndID(DEAL_ROOM_NAME, STRUCTURE_TERMINAL, dealTerminalID, 'TARGET'))
                return '正在执行send任务'

            var ORDER = Game.market.getOrderById(ORDER_ID)
            if (!ORDER)
                return 'order id 无效'

            if (ORDER.resourceType === RESOURCE_ENERGY)
                return '不允许交割energy'

            controllerMemory.setSTRUCTURE_TEAMSvalueByKeyAndID(DEAL_ROOM_NAME, STRUCTURE_TERMINAL, dealTerminalID, 'ORDER_ID', ORDER_ID)

            if (ORDER.type == 'sell') {
                var ORDER_CONTENT = {}
                var COAST = AMOUNT
                ORDER_CONTENT[RESOURCE_ENERGY] = Game.market.calcTransactionCost(AMOUNT, DEAL_ROOM_NAME, ORDER.roomName)
                controllerMemory.setSTRUCTURE_TEAMSvalueByKeyAndID(DEAL_ROOM_NAME, STRUCTURE_TERMINAL, dealTerminalID, 'COAST', COAST)
                controllerMemory.setSTRUCTURE_TEAMSvalueByKeyAndID(DEAL_ROOM_NAME, STRUCTURE_TERMINAL, dealTerminalID, 'ORDER_CONTENT', ORDER_CONTENT)
            } else if (ORDER.type == 'buy') {
                var ORDER_CONTENT = {}
                var COAST = Game.market.calcTransactionCost(AMOUNT, DEAL_ROOM_NAME, ORDER.roomName)
                ORDER_CONTENT[RESOURCE_ENERGY] = COAST
                ORDER_CONTENT[ORDER.resourceType] = AMOUNT
                controllerMemory.setSTRUCTURE_TEAMSvalueByKeyAndID(DEAL_ROOM_NAME, STRUCTURE_TERMINAL, dealTerminalID, 'COAST', COAST)
                controllerMemory.setSTRUCTURE_TEAMSvalueByKeyAndID(DEAL_ROOM_NAME, STRUCTURE_TERMINAL, dealTerminalID, 'ORDER_CONTENT', ORDER_CONTENT)
            }

            return 'success'
        }

        global.cover = function (DEAL_ROOM_NAME, resourceType, totalAmount) {
            // 判断房间名称是否写错
            if (!(DEAL_ROOM_NAME in ROOM_LIST))
                return '房间名称错误'

            if (!(Number.isFinite(totalAmount) && totalAmount >= 0))
                return '数量定义错误'

            if (!RESOURCES_ALL.includes(resourceType))
                return '资源定义错误'

            var dealTerminalID = null
            for (var temp in controllerMemory.getSTRUCTURE_TEAMS(DEAL_ROOM_NAME, STRUCTURE_TERMINAL)) {
                dealTerminalID = temp
            }

            controllerMemory.setSTRUCTURE_TEAMSvalueByKeyAndID(DEAL_ROOM_NAME, STRUCTURE_TERMINAL, dealTerminalID, 'COVER', true)
            controllerMemory.setSTRUCTURE_TEAMSvalueByKeyAndID(DEAL_ROOM_NAME, STRUCTURE_TERMINAL, dealTerminalID, 'ORDER_ID', 'ORDER_SELL')
            var ORDER_CONTENT = {}
            ORDER_CONTENT[resourceType] = totalAmount
            controllerMemory.setSTRUCTURE_TEAMSvalueByKeyAndID(DEAL_ROOM_NAME, STRUCTURE_TERMINAL, dealTerminalID, 'ORDER_CONTENT', ORDER_CONTENT)
            return 'success'
        }

        global.resetCover = function (DEAL_ROOM_NAME) {
            // 判断房间名称是否写错
            if (!(DEAL_ROOM_NAME in ROOM_LIST))
                return '房间名称错误'

            var dealTerminalID = null
            for (var temp in controllerMemory.getSTRUCTURE_TEAMS(DEAL_ROOM_NAME, STRUCTURE_TERMINAL)) {
                dealTerminalID = temp
            }

            controllerMemory.setSTRUCTURE_TEAMSvalueByKeyAndID(DEAL_ROOM_NAME, STRUCTURE_TERMINAL, dealTerminalID, 'COVER', false)
            return 'success'
        }

        global.enable = function (roomName, structureType) {
            // 判断房间名称是否写错
            if (!(roomName in ROOM_LIST))
                return '房间名称错误'

            if (![STRUCTURE_POWER_SPAWN, STRUCTURE_NUKER].includes(structureType))
                return '开启建筑错误'

            var enableStructureID = null
            for (var temp in controllerMemory.getSTRUCTURE_TEAMS(roomName, structureType)) {
                enableStructureID = temp
            }

            controllerMemory.setSTRUCTURE_TEAMSvalueByKeyAndID(roomName, structureType, enableStructureID, 'ENABLE', true)
            return 'success'
        }

        global.disable = function (roomName, structureType) {
            // 判断房间名称是否写错
            if (!(roomName in ROOM_LIST))
                return '房间名称错误'

            if (![STRUCTURE_POWER_SPAWN, STRUCTURE_NUKER].includes(structureType))
                return '开启建筑错误'

            var enableStructureID = null
            for (var temp in controllerMemory.getSTRUCTURE_TEAMS(roomName, structureType)) {
                enableStructureID = temp
            }

            controllerMemory.setSTRUCTURE_TEAMSvalueByKeyAndID(roomName, structureType, enableStructureID, 'ENABLE', false)
            return 'success'
        }

        global.resetPath = function () {
            global.path = {}
            return 'success'
        }
    }
}

module.exports = controllerCommand;


// Game.market.createOrder({
//     type: ORDER_SELL,
//     resourceType: RESOURCE_LEMERGIUM,
//     price: 28,
//     totalAmount: 200000,
//     roomName: 'E18N24'
// });
// cover('E18N24',RESOURCE_LEMERGIUM,200000)
// set('E23N22','UPGRADER','',2)
// send('E18N25','E19N26','energy',100000)
// send('E19N26','E19N24','energy',200000)
// send('E18N25','E18N24',RESOURCE_OXYGEN,100000)
// send('E19N24','E18N24',RESOURCE_LEMERGIUM,100000)
// enable('E18N25',STRUCTURE_POWER_SPAWN)
// disable('E18N25',STRUCTURE_POWER_SPAWN)
// enable('E18N25',STRUCTURE_NUKER)