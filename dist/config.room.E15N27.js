'use strict';
var ROOM_NAME = 'E15N27'
var CONTROLLER_ROOM_NAME = 'E15N27'


var E15N27 = {
    // 房间名称
    ROOM_NAME: ROOM_NAME,

    // 预定还是实际控制
    RESERVE_OR_CONTROL: 'CONTROL',

    // 实际控制房间名称
    CONTROLLER_ROOM_NAME: CONTROLLER_ROOM_NAME,

    // 墙壁血条厚度
    WALL_RAMPART_HITS: 100000,

    // 避难所
    REFUGE: [13, 33, CONTROLLER_ROOM_NAME],

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
        MAINTAINER: {
            ROLE: 'maintainer_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 2,
            FACT_NUMBER: 0,
            HANG_POS: [23, 20, ROOM_NAME],
            ENERGY_SOURCE: ['6593d3613c7cc8ab1e836707'],
            ENERGY_DESTINATION: ['6593d3613c7cc8ab1e836707'],
            BODY: [
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
            ],
        },
        HARVESTER: {
            ROLE: 'harvester_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 0,
            FACT_NUMBER: 0,
            HANG_POS: [],
            ENERGY_SOURCE: [],
            ENERGY_DESTINATION: [],
            BODY: [
                WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                MOVE, MOVE
            ],
        },
        MINER: {
            ROLE: 'miner_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 0,
            FACT_NUMBER: 0,
            HANG_POS: [],
            ENERGY_SOURCE: [],
            ENERGY_DESTINATION: [],
            BODY: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
        },
        CARRIER: {
            ROLE: 'carrier_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 1,
            FACT_NUMBER: 0,
            HANG_POS: [17, 40, ROOM_NAME],
            ENERGY_SOURCE: ['659d254264c060177b2f1678'],
            ENERGY_DESTINATION: ['6593d3613c7cc8ab1e836707'],
            BODY: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        },
        DEFENDER: {
            ROLE: 'defender_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 0,
            FACT_NUMBER: 0,
            HANG_POS: [28, 13, ROOM_NAME],
            BODY: [
                TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, ATTACK, MOVE,
                ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, RANGED_ATTACK, MOVE,
                RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE
            ],
        },
        BUILDER: {
            ROLE: 'builder_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 0,
            FACT_NUMBER: 0,
            HANG_POS: [26, 13, ROOM_NAME],
            ENERGY_SOURCE: ['6593d3613c7cc8ab1e836707'],
            ENERGY_DESTINATION: [],
            BODY: [
                WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
            ],
        },
        UPGRADER: {
            ROLE: 'upgrader_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 2,
            FACT_NUMBER: 0,
            HANG_POS: [9, 19, ROOM_NAME],
            ENERGY_SOURCE: ['6596ae6037a6b0511b8ca28a'],
            ENERGY_DESTINATION: [],
            BODY: [
                WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
            ],
        },
    },

    // 建筑编队
    STRUCTURE_TEAMS: {
        CONTAINER: {
            '65b735a10d7fd2931ad09f3a': {},
            '659d254264c060177b2f1678': {},
            '65b74b4bd149a21fb5ff5ca2': {},
        },

        CONTROLLER: { '5bbcadca9099fc012e637df8': {} },

        EXTENSION: {
            '6592609d5510308d0013b679': {
                REMARK: '(21,20)'
            },
            '65926ac3f3baa2765bed7e00': {
                REMARK: '(20,19)'
            },
            '6592759dc365d346a829430f': {
                REMARK: '(20,18)'
            },
            '659278f74565033803687e52': {
                REMARK: '(19,18)'
            },
            '6592836b20bacc43687f94e1': {
                REMARK: '(19,17)'
            },
            '65928ae2642aeea6512addeb': {
                REMARK: '(18,17)'
            },
            '65928edc82ea4ecbbbd60ae0': {
                REMARK: '(18,16)'
            },
            '65929453c350041f31192f62': {
                REMARK: '(17,16)'
            },
            '65929a4067912d02cf033a8d': {
                REMARK: '(17,15)'
            },
            '6592a0220e990884c1f9fd0f': {
                REMARK: '(16,15)'
            },
            '6593733703cacd421ebeee57': {
                REMARK: '(16,14)'
            },
            '65937849675a157ce248fc86': {
                REMARK: '(15,14)'
            },
            '65937c040fc8f045993c8f30': {
                REMARK: '(15,13)'
            },
            '6593814a5ecd20368f10a8db': {
                REMARK: '(14,13)'
            },
            '65939cbd3d1a7c63ca53b4cc': {
                REMARK: '(14,12)'
            },
            '659384d6c3d3ae7650daab7d': {
                REMARK: '(12,13)'
            },
            '659388fd51276abde6c6def1': {
                REMARK: '(12,14)'
            },
            '65938def6d55a3a889e58225': {
                REMARK: '(13,14)'
            },
            '6593944dff1ec93d0ba9ad1b': {
                REMARK: '(13,15)'
            },
            '659398a603cacd63cdbef914': {
                REMARK: '(14,16)'
            },
            '6596336200df6f46e872fcde': {
                REMARK: '(15,16)'
            },
            '659636eb19c7b7e2a56c1ae5': {
                REMARK: '(15,17)'
            },
            '65963b894eb932378cc44aba': {
                REMARK: '(16,17)'
            },
            '659643aca08c7f60a29fcda0': {
                REMARK: '(16,18)'
            },
            '6596479f26c762553e7b333b': {
                REMARK: '(17,18)'
            },
            '65964d84b72bfe1aae39e148': {
                REMARK: '(17,19)'
            },
            '659656de32e869320965a258': {
                REMARK: '(18,19)'
            },
            '65965d3fdb25a611abf18af2': {
                REMARK: '(18,20)'
            },
            '659665fd80da801ea0a1403b': {
                REMARK: '(19,20)'
            },
            '65966d96862b066ff0d2745a': {
                REMARK: '(19,21)'
            },
            '659d2789a08c7f5c3da1a8ee': {
                REMARK: '(24,18)'
            },
            '659d28ed568de630be60d3d4': {
                REMARK: '(24,17)'
            },
            '659d2a5e58c1a2bb4177b50f': {
                REMARK: '(23,17)'
            },
            '659d2cb11fcea52e4e0b305b': {
                REMARK: '(23,16)'
            },
            '659d2f3e81edcac2de76e979': {
                REMARK: '(22,16)'
            },
            '659d314d4315b4c308d0171b': {
                REMARK: '(22,15)'
            },
            '659d353858c1a2451177b7e9': {
                REMARK: '(21,15)'
            },
            '659d381410cf667a1c07703a': {
                REMARK: '(21,14)'
            },
            '659d3c11c256037247993569': {
                REMARK: '(20,14)'
            },
            '659d402d0b07ffe8a31c5674': {
                REMARK: '(20,13)'
            },
            '65aaaa1a90ea9062f9012540': {
                REMARK: '(19,13)'
            },
            '65aaabf5297db77fe1e0081c': {
                REMARK: '(19,12)'
            },
            '65aaad9799057759bfb7afed': {
                REMARK: '(18,12)'
            },
            '65aaafd252403fc0fee6d65c': {
                REMARK: '(18,11)'
            },
            '65aab209a95a8d520de94f60': {
                REMARK: '(17,11)'
            },
            '65aab529e256900dfa7375b5': {
                REMARK: '(17,10)'
            },
            '65aab7c99905776017b7b2c2': {
                REMARK: '(15,11)'
            },
            '65aab9d75368411a9a0e4f58': {
                REMARK: '(15,12)'
            },
            '65aabc29e3a2e0487c91217d': {
                REMARK: '(16,12)'
            },
            '65aabe13596f233d2c061953': {
                REMARK: '(16,13)'
            },
        },

        FACTORY: {},

        LAB: {},

        LINK: {
            '65968a8620db95ae2609cd25': {
                TARGET: ['6596ae6037a6b0511b8ca28a'],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: true,
                REMARK: '(22,23)'
            },
            '6596ae6037a6b0511b8ca28a': {
                TARGET: [],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: false,
                REMARK: '(10,18)'
            },
            '659cc4d42c5995058f9dbe51': {
                TARGET: ['65968a8620db95ae2609cd25', '6596ae6037a6b0511b8ca28a'],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: false,
                REMARK: '(42,31)'
            },
            '65aaa8294dc96a2394edd6c5': {
                TARGET: ['65968a8620db95ae2609cd25', '6596ae6037a6b0511b8ca28a'],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: false,
                REMARK: '(43,13)'
            },
        },

        MINERAL: {
            '5bbcb35540062e4259e942e3': {
                HAVEST_POS: [21, 41, ROOM_NAME],
                WORKER_NUMBER: 0,
                RESOURCES_TYPE: RESOURCE_KEANIUM,
                CONTAINER: '65b74750bee9022f34898e10',
            },
        },

        NUKER: {},

        OBSERVER: {},

        POWERSPAWN: {},

        SOURCE: {
            '5bbcadca9099fc012e637df9': {
                HAVEST_POS: [43, 32, ROOM_NAME],
                WORKER_NUMBER: 1,
                RESOURCES_TYPE: RESOURCE_ENERGY,
                CONTAINER: '65b735a10d7fd2931ad09f3a',
                LINK: '659cc4d42c5995058f9dbe51',
            },
            '5bbcadca9099fc012e637df7': {
                HAVEST_POS: [42, 12, ROOM_NAME],
                WORKER_NUMBER: 1,
                RESOURCES_TYPE: RESOURCE_ENERGY,
                CONTAINER: '65b74b4bd149a21fb5ff5ca2',
                LINK: '65aaa8294dc96a2394edd6c5',
            },
        },

        SPAWN: {
            '6591a6a05dfb9373ac460b83': {
                NAME: 'Spawn14',
                DIRECTIONS: [BOTTOM_RIGHT, BOTTOM],
                NEAR_BY: [],
                NEXT_BORN: null,
            },
            '65aac9361a6f52df8e917c82': {
                NAME: 'Spawn17',
                DIRECTIONS: [BOTTOM_RIGHT, BOTTOM],
                NEAR_BY: [],
                NEXT_BORN: null,
            },
        },

        STORAGE: {
            '6593d3613c7cc8ab1e836707': {}
        },

        TERMINAL: {
            '659cc077ee91e4ebdd9960c7': {
                ORDER_ID: '',
                TARGET: '',
                COAST: 0,
                COVER: false,
                ORDER_CONTENT: {
                    /**RESOURCE_ENERGY:1000,
                     * RESOURCE_ANOTHER:1000, */
                },
            }
        },

        TOWER: {
            '6592a833aacfe69e6fd365d0': {
                REMARK: '(21,23)',
            },
            '65967d5b1fcea55dee09686b': {
                REMARK: '(13,12)',
            },
            '65aac1e29cff1050504b61ea': {
                REMARK: '(16,10)',
            },
        },

    }
}

module.exports = E15N27;
