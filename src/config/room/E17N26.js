'use strict';
var ROOM_NAME = 'E17N26'
var CONTROLLER_ROOM_NAME = 'E18N25'


var E17N26 = {
    // 房间名称
    ROOM_NAME: ROOM_NAME,

    // 预定还是实际控制
    RESERVE_OR_CONTROL: 'RESERVE',

    // 实际控制房间名称
    CONTROLLER_ROOM_NAME: CONTROLLER_ROOM_NAME,

    // 墙壁血条厚度
    WALL_RAMPART_HITS: 0,

    // 避难所
    REFUGE: [20, 28, CONTROLLER_ROOM_NAME],

    // creep memory 标记统计
    CREEP_MEMORY_MARK_NUM: {},

    // 未知creep
    HOSTILE_CREEPS: [],

    // 被攻击标记
    RAID_MARK: false,

    // 未知建筑
    HOSTILE_STRUCTURES: [],

    // 需要治愈的我方creep
    MY_CREEPS_NEED_HEAL: [],

    // 需要维修的建筑
    STRUCTURES_NEED_REPAIR: [],

    // 需要创建的脚手架
    CONSTRUCTION_SITE: [],

    // 损毁的建筑物（包含资源）
    RUIN_WITH_SOURCE: [],

    // 墓碑（包含资源）
    TOMBSTONE_WITH_SOURCE: [],

    // 掉落的资源
    DROPPED_SOURCE: [],

    // 需要送入资源的建筑
    SEND_IN: {
        SPAWN: [],
        EXTENSION: [],
        LINK: [],
        TOWER: [],
        TERMINAL: [],
        POWERSPAWN: [],
        NUKER: [],
    },

    // 需要移出资源的建筑
    MOVE_OUT: {
        LINK: [],
        TERMINAL: [],
    },

    // creep 编队
    CREEP_TEAMS: {
        // 常规队伍
        DEFENDER: {
            ROLE: 'defender_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 0,
            FACT_NUMBER: 0,
            HANG_POS: [29, 41, ROOM_NAME],
            BODY: [TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE],
        },
        RESERVER: {
            ROLE: 'reserver_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 0,
            FACT_NUMBER: 0,
            BODY: [CLAIM, CLAIM, MOVE, MOVE],
        },
        HARVESTER: {
            ROLE: 'harvester_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 0,
            FACT_NUMBER: 0,
            HANG_POS: [24, 41, ROOM_NAME],
            ENERGY_SOURCE: [],
            ENERGY_DESTINATION: [],
            BODY: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
        },
        CARRIER: {
            ROLE: 'carrier_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 2,
            FACT_NUMBER: 0,
            HANG_POS: [29, 41, ROOM_NAME],
            ENERGY_SOURCE: [],
            ENERGY_DESTINATION: ['652e459ecb8a2419aaadaca0'],
            BODY: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
        },
    },

    // 建筑编队
    STRUCTURE_TEAMS: {
        CONTAINER: {},

        CONTROLLER: { '5bbcadeb9099fc012e63823a': {} },

        EXTENSION: {},

        FACTORY: {},

        LAB: {},

        LINK: {},

        MINERAL: {},

        NUKER: {},

        OBSERVER: {},

        POWERSPAWN: {},

        SOURCE: {
            '5bbcadeb9099fc012e638239': {
                HAVEST_POS: [24, 41, ROOM_NAME],
                WORKER_NUMBER: 1,
                RESOURCES_TYPE: RESOURCE_ENERGY,
                CONTAINER: '',
                LINK: '',
            },
        },

        SPAWN: {},

        STORAGE: {},

        TERMINAL: {},

        TOWER: {},

    }
}

module.exports = E17N26;


