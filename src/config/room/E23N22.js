'use strict';
var ROOM_NAME = 'E23N22'
var CONTROLLER_ROOM_NAME = 'E23N22'


var E23N22 = {
    // 房间名称
    ROOM_NAME: ROOM_NAME,

    // 预定还是实际控制
    RESERVE_OR_CONTROL: 'CONTROL',

    // 实际控制房间名称
    CONTROLLER_ROOM_NAME: CONTROLLER_ROOM_NAME,

    // 墙壁血条厚度
    WALL_RAMPART_HITS: 100000,

    // 避难所
    REFUGE: [17, 20, CONTROLLER_ROOM_NAME],

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
            HANG_POS: [15, 34, ROOM_NAME],
            ENERGY_SOURCE: ['6587f11b61885827ecdac20e'],
            ENERGY_DESTINATION: ['6587f11b61885827ecdac20e'],
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
            HANG_POS: [25, 25, ROOM_NAME],
            ENERGY_SOURCE: ['658e6bbaee6b79c2e6b21724'],
            ENERGY_DESTINATION: ['6587f11b61885827ecdac20e'],
            BODY: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        },
        DEFENDER: {
            ROLE: 'defender_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 0,
            FACT_NUMBER: 0,
            HANG_POS: [6, 18, ROOM_NAME],
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
            HANG_POS: [14, 20, ROOM_NAME],
            ENERGY_SOURCE: ['6587f11b61885827ecdac20e'],
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
            HANG_POS: [33, 27, ROOM_NAME],
            ENERGY_SOURCE: ['658947079e38d24a6a981a78'],
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
            '65b7dacc39d182200ea8b972': {},
            '658e6bbaee6b79c2e6b21724': {},
            '65b7e41bd934059434d14614': {},
        },

        CONTROLLER: { '5bbcae419099fc012e638a61': {} },

        EXTENSION: {
            '6585e2a99e0401d09c680db9': {
                REMARK: '(16,30)'
            },
            '65864fe76aa7f40b825ed0c6': {
                REMARK: '(15,29)'
            },
            '6586533fd975004f593a8c0e': {
                REMARK: '(15,28)'
            },
            '658657588556fcb7fa726db0': {
                REMARK: '(14,28)'
            },
            '65865cfdb74d81bfa91fd0bf': {
                REMARK: '(14,27)'
            },
            '65868d9a9f77c01519f64dcd': {
                REMARK: '(13,27)'
            },
            '658688ce2dc3983f39962bef': {
                REMARK: '(13,26)'
            },
            '658692a76d93ddc36a93a42a': {
                REMARK: '(12,26)'
            },
            '65869b38f8c0ece3176a9d04': {
                REMARK: '(12,25)'
            },
            '6586a19babbdf1072c11b8ea': {
                REMARK: '(11,25)'
            },
            '6587986c6dbef4d669540cfa': {
                REMARK: '(11,24)'
            },
            '65879c81b37f006b3f4a6ec6': {
                REMARK: '(10,24)'
            },
            '65879feb4dd0ff33cb702c3e': {
                REMARK: '(10,23)'
            },
            '6587a3a339cac79599472172': {
                REMARK: '(8,24)'
            },
            '6587a789b37f00af034a71cf': {
                REMARK: '(8,25)'
            },
            '6587aa7d47cc9645ae47545a': {
                REMARK: '(9,25)'
            },
            '6587ad435a98b964c22f6d05': {
                REMARK: '(9,26)'
            },
            '6587b07dde549cb23316a54f': {
                REMARK: '(10,26)'
            },
            '6587b3ba6127938c4953875d': {
                REMARK: '(10,27)'
            },
            '6587b983359d00d2b7d9355f': {
                REMARK: '(11,27)'
            },
            '6588d8589f77c05241f6f102': {
                REMARK: '(11,28)'
            },
            '6588dad44ec40263382d8255': {
                REMARK: '(12,28)'
            },
            '6588e20402927d2d0ad81a0d': {
                REMARK: '(12,29)'
            },
            '6588e6046d93dd70ff94451a': {
                REMARK: '(13,29)'
            },
            '6588e9a8752a13e689a4ed46': {
                REMARK: '(13,30)'
            },
            '6588ecbdb052d85eb634f74b': {
                REMARK: '(14,30)'
            },
            '6588f4d76d93dd2dab94481f': {
                REMARK: '(14,31)'
            },
            '6588fc65de549c1e071702e6': {
                REMARK: '(15,31)'
            },
            '6589006a1414dba37c7c0447': {
                REMARK: '(15,32)'
            },
            '658903a98ce1bc843e3e2e7b': {
                REMARK: '(16,32)'
            },
            '658e2580b21c3b35e1ba8493': {
                REMARK: '(19,28)'
            },
            '658e26c49a203af86d6ba9ed': {
                REMARK: '(19,27)'
            },
            '658e27f72f7903413c9cb831': {
                REMARK: '(18,27)'
            },
            '658e293331999d5a4881b7c8': {
                REMARK: '(18,26)'
            },
            '658e2a7013c9c21bce24a181': {
                REMARK: '(17,26)'
            },
            '658e2bac990a18296d294634': {
                REMARK: '(17,25)'
            },
            '658e2da8f49864cb97e99978': {
                REMARK: '(16,25)'
            },
            '658e2edfb1047910fac36cc4': {
                REMARK: '(16,24)'
            },
            '658e30b9359de410ba8f461e': {
                REMARK: '(15,24)'
            },
            '658e326d486a04e93db48988': {
                REMARK: '(15,23)'
            },
            '659c92528cf831ada0a02366': {
                REMARK: '(14,23)'
            },
            '659c9776522cc8111fbfcec4': {
                REMARK: '(14,22)'
            },
            '659c98cd8facfd93719d2d79': {
                REMARK: '(13,22)'
            },
            '659c9a3840f1b75efbda95cb': {
                REMARK: '(13,21)'
            },
            '659cdf74e40e0a5e676996c7': {
                REMARK: '(10,22)'
            },
            '659c9bb9a279e856a2999893': {
                REMARK: '(11,22)'
            },
            '659c9d3e68f1416d0568fa91': {
                REMARK: '(11,23)'
            },
            '659c9edc0afd38f958517e1f': {
                REMARK: '(12,23)'
            },
            '659ca03df748b572b698dfd2': {
                REMARK: '(12,24)'
            },
            '659ca208c787dd38a5399282': {
                REMARK: '(13,24)'
            },
        },

        FACTORY: {},

        LAB: {},

        LINK: {
            '65890ac7482794860faebf60': {
                TARGET: ['658947079e38d24a6a981a78'],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: true,
                REMARK: '(17,33)'
            },
            '658947079e38d24a6a981a78': {
                TARGET: [],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: false,
                REMARK: '(32,26)'
            },
            '658e35dfb6b0b0529326bf73': {
                TARGET: ['65890ac7482794860faebf60', '658947079e38d24a6a981a78'],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: false,
                REMARK: '(5,40)'
            },
            '659c957a657944c0ebe0d661': {
                TARGET: ['65890ac7482794860faebf60', '658947079e38d24a6a981a78'],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: false,
                REMARK: '(12,34)'
            }
        },

        MINERAL: {
            '5bbcb5c8d867df5e542071d3': {
                HAVEST_POS: [25, 23, ROOM_NAME],
                WORKER_NUMBER: 0,
                RESOURCES_TYPE: RESOURCE_CATALYST,
                CONTAINER: '65b7df73b6ac5c2aca5b2a76',
            }
        },

        NUKER: {},

        OBSERVER: {},

        POWERSPAWN: {},

        SOURCE: {
            '5bbcae419099fc012e638a63': {
                HAVEST_POS: [4, 39, ROOM_NAME],
                WORKER_NUMBER: 1,
                RESOURCES_TYPE: RESOURCE_ENERGY,
                CONTAINER: '65b7dacc39d182200ea8b972',
                LINK: '658e35dfb6b0b0529326bf73',
            },
            '5bbcae419099fc012e638a62': {
                HAVEST_POS: [13, 35, ROOM_NAME],
                WORKER_NUMBER: 1,
                RESOURCES_TYPE: RESOURCE_ENERGY,
                CONTAINER: '65b7e41bd934059434d14614',
                LINK: '659c957a657944c0ebe0d661',
            },
        },

        SPAWN: {
            '6585da9906dc3af59cb22c5a': {
                NAME: 'Spawn10',
                DIRECTIONS: [BOTTOM_RIGHT, BOTTOM],
                NEAR_BY: [],
                NEXT_BORN: null,
            },
            '659cacb30681706f0ec4beb2': {
                NAME: 'Spawn16',
                DIRECTIONS: [BOTTOM_RIGHT, BOTTOM],
                NEAR_BY: [],
                NEXT_BORN: null,
            },
        },

        STORAGE: {
            '6587f11b61885827ecdac20e': {}
        },

        TERMINAL: {
            '658e6399eda40cc60bc9c745': {
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
            '6586a86fd276366ff7dfe1dd': {
                REMARK: '(16,33)'
            },
            '658914e8c665f0b909df0e58': {
                REMARK: '(9,23)'
            },
            '659ca5938facfd4efd9d3057': {
                REMARK: '(12,21)'
            }
        },

    }
}

module.exports = E23N22;
