'use strict';
var ROOM_NAME = 'E19N26'
var CONTROLLER_ROOM_NAME = 'E19N26'


var E19N26 = {
    // 房间名称
    ROOM_NAME: ROOM_NAME,

    // 预定还是实际控制
    RESERVE_OR_CONTROL: 'CONTROL',

    // 实际控制房间名称
    CONTROLLER_ROOM_NAME: CONTROLLER_ROOM_NAME,

    // 墙壁血条厚度
    WALL_RAMPART_HITS: 100000,

    // 避难所
    REFUGE: [8, 11, CONTROLLER_ROOM_NAME],

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
            HANG_POS: [26, 26, ROOM_NAME],
            ENERGY_SOURCE: ['6575a2baf73fe8a24192ab7e'],
            ENERGY_DESTINATION: ['6575a2baf73fe8a24192ab7e'],
            BODY: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
        },
        HARVESTER: {
            ROLE: 'harvester_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 0,
            FACT_NUMBER: 0,
            HANG_POS: [],
            ENERGY_SOURCE: [],
            ENERGY_DESTINATION: [],
            BODY: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
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
            HANG_POS: [19, 21, ROOM_NAME],
            ENERGY_SOURCE: ['657de48a94a168632629fa02'],
            ENERGY_DESTINATION: ['6575a2baf73fe8a24192ab7e'],
            BODY: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        },
        DEFENDER: {
            ROLE: 'defender_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 0,
            FACT_NUMBER: 0,
            HANG_POS: [33, 32, ROOM_NAME],
            BODY: [TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE],
        },
        BUILDER: {
            ROLE: 'builder_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 0,
            FACT_NUMBER: 0,
            HANG_POS: [11, 11, ROOM_NAME],
            ENERGY_SOURCE: ['6575a2baf73fe8a24192ab7e'],
            ENERGY_DESTINATION: [],
            BODY: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
        },
        UPGRADER: {
            ROLE: 'upgrader_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 1,
            FACT_NUMBER: 0,
            HANG_POS: [4, 7, ROOM_NAME],
            ENERGY_SOURCE: ['6576a1375ebeb357c7ea3a19'],
            ENERGY_DESTINATION: [],
            BODY: [WORK, CARRY, MOVE],
        },
    },

    // 建筑编队
    STRUCTURE_TEAMS: {
        CONTAINER: {
            '65743b07c9d00e8207696bc6': {},
            '65744568bc26a0e2e435ce6d': {},
            '657de48a94a168632629fa02': {},
        },

        CONTROLLER: { '5bbcae089099fc012e63854a': {} },

        EXTENSION: {
            '6574a2424a3ad8eff991eb4c': {
                REMARK: '(17,24)'
            },
            '6574a673384dc72366f09957': {
                REMARK: '(16,23)'
            },
            '6574a90a0e50c22ed320ce1e': {
                REMARK: '(16,22)'
            },
            '6574acad78d3ae7f217357e7': {
                REMARK: '(15,22)'
            },
            '6574b04af73fe8a70092676e': {
                REMARK: '(15,21)'
            },
            '6574b3cc768f0b72febbb5cc': {
                REMARK: '(14,21)'
            },
            '6574b91ab58bd653a6666490': {
                REMARK: '(14,20)'
            },
            '657da3d9f474af0daff10c44': {
                REMARK: '(10,20)'
            },
            '6574bc66aeb7ffd3d5d688e4': {
                REMARK: '(11,21)'
            },
            '6574c03c40e951a4b4992088': {
                REMARK: '(12,21)'
            },
            '6574c3132f5e58bacf42ec52': {
                REMARK: '(12,22)'
            },
            '65753bf2071901224975262f': {
                REMARK: '(13,22)'
            },
            '65753f26c9d00e42c769b043': {
                REMARK: '(13,23)'
            },
            '65754290894de57bce21fb17': {
                REMARK: '(14,23)'
            },
            '6575463aaeb7ff3079d6afb4': {
                REMARK: '(14,24)'
            },
            '65754a5e25c55690711f8932': {
                REMARK: '(15,24)'
            },
            '65754dbc9ca6764748742041': {
                REMARK: '(15,25)'
            },
            '657550e085b6b5ef2994e521': {
                REMARK: '(16,25)'
            },
            '657558aa4a8d813cc35bc4e4': {
                REMARK: '(16,26)'
            },
            '65755c8a6e7e464cc87707cb': {
                REMARK: '(17,26)'
            },
            '6576ac50708acd8102f7dbb7': {
                REMARK: '(18,30)'
            },
            '6576aff69283a786912fb804': {
                REMARK: '(18,29)'
            },
            '6576b59207190199e7758d98': {
                REMARK: '(17,29)'
            },
            '6576b8ca768f0b84b4bc45e1': {
                REMARK: '(17,28)'
            },
            '6576bc672a7853ee2899e37c': {
                REMARK: '(16,28)'
            },
            '6576c0ab905df32977bb0985': {
                REMARK: '(16,27)'
            },
            '6576c4e9c9d00e37b56a178f': {
                REMARK: '(15,27)'
            },
            '6576c8b5ef48ee39b4104809': {
                REMARK: '(15,26)'
            },
            '6576ce3b06a1a9cea8ced544': {
                REMARK: '(14,26)'
            },
            '6576d1c597260daf9eaabbbd': {
                REMARK: '(14,25)'
            },
            '6576d5ba94a168ec6e27ff66': {
                REMARK: '(13,25)'
            },
            '657da5722e87b0aa4cfde4d1': {
                REMARK: '(13,24)'
            },
            '657da718e123dd36cf5d3f40': {
                REMARK: '(12,24)'
            },
            '657da8beef48ee110512279e': {
                REMARK: '(12,23)'
            },
            '657daa7daeb7ff53bad8fe67': {
                REMARK: '(11,23)'
            },
            '657dad4860a2af86703b2341': {
                REMARK: '(11,22)'
            },
            '657daf5df623bbfdf2869814': {
                REMARK: '(10,22)'
            },
            '657db0f3d13c8d9db8090407': {
                REMARK: '(10,21)'
            },
            '657db2566c806914f1f3c690': {
                REMARK: '(9,21)'
            },
            '657db3a484eef27698c338e1': {
                REMARK: '(9,20)'
            },
            '658a525958a74807621ad8b6': {
                REMARK: '(8,20)'
            },
            '658a53dc1b5680177f0ecc5f': {
                REMARK: '(8,22)'
            },
            '658a554ec113b3767c1fe53d': {
                REMARK: '(8,23)'
            },
            '658a56ab2b84a96d6ee02075': {
                REMARK: '(9,23)'
            },
            '658a5873d48b775f71fe7486': {
                REMARK: '(9,24)'
            },
            '658a59fd02927d2805d8808e': {
                REMARK: '(10,24)'
            },
            '658a5ba37721ba08de9e6c30': {
                REMARK: '(10,25)'
            },
            '658a5d26b818e86c339df6c3': {
                REMARK: '(11,25)'
            },
            '658a5e9528083b84e2035e1f': {
                REMARK: '(11,26)'
            },
            '658a60064ec40248452deaee': {
                REMARK: '(12,26)'
            },
            '65afc969f6f9836de4fd4e5f': {
                REMARK: '(12,27)'
            },
            '65afcb35c09671392fc3dda1': {
                REMARK: '(13,27)'
            },
            '65afccc22ef2c1d1ddc2fc99': {
                REMARK: '(13,28)'
            },
            '65afce99bf0af846ffe1810e': {
                REMARK: '(14,28)'
            },
            '65afd4f05f0c7a144d56e3f0': {
                REMARK: '(14,29)'
            },
            '65afd67f3b7c440626e5a6d3': {
                REMARK: '(15,29)'
            },
            '65afd80373d443c0c3e3fe4f': {
                REMARK: '(15,30)'
            },
            '65afd99c3e97830203250ca8': {
                REMARK: '(16,30)'
            },
            '65afdbd516e26fc4e782272b': {
                REMARK: '(16,31)'
            },
            '65afdd68dd9f37222fcbcdb6': {
                REMARK: '(17,31)'
            },
        },

        FACTORY: {},

        LAB: {},

        LINK: {
            '657699f6be9b511a6069139e': {
                TARGET: ['657d9a7741407f9fb0dbf004', '6576a1375ebeb357c7ea3a19'],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: false,
                REMARK: '(2,22)'
            },
            '6576a1375ebeb357c7ea3a19': {
                TARGET: [''],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: false,
                REMARK: '(3,6)'
            },
            '657d9a7741407f9fb0dbf004': {
                TARGET: ['6576a1375ebeb357c7ea3a19'],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: true,
                REMARK: '(18,27)'
            },
            '658a50aeb052d8e1dd35589b': {
                TARGET: ['657d9a7741407f9fb0dbf004', '6576a1375ebeb357c7ea3a19'],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: false,
                REMARK: '(20,5)'
            },
        },

        MINERAL: {
            '5bbcb37f40062e4259e94455': {
                HAVEST_POS: [20, 19, ROOM_NAME],
                WORKER_NUMBER: 0,
                RESOURCES_TYPE: RESOURCE_HYDROGEN,
                CONTAINER: '657de48a94a168632629fa02',
            }
        },

        NUKER: {
            '65b0af9ccc9b48b6be92d530': {
                ENABLE: false,
                ORDER_CONTENT: {
                    /**RESOURCE_ENERGY:1000,
                     * RESOURCE_ANOTHER:1000, */
                },
            }
        },

        OBSERVER: {},

        POWERSPAWN: {
            '65b0182ad37a4c1b6e2635c1': {
                ENABLE: false,
                ORDER_CONTENT: {
                    /**RESOURCE_ENERGY:1000,
                     * RESOURCE_ANOTHER:1000, */
                },
            },
        },

        SOURCE: {
            '5bbcae089099fc012e63854c': {
                HAVEST_POS: [3, 23, ROOM_NAME],
                WORKER_NUMBER: 1,
                RESOURCES_TYPE: RESOURCE_ENERGY,
                CONTAINER: '65743b07c9d00e8207696bc6',
                LINK: '657699f6be9b511a6069139e',
            },
            '5bbcae089099fc012e63854b': {
                HAVEST_POS: [19, 6, ROOM_NAME],
                WORKER_NUMBER: 1,
                RESOURCES_TYPE: RESOURCE_ENERGY,
                CONTAINER: '65744568bc26a0e2e435ce6d',
                LINK: '658a50aeb052d8e1dd35589b',
            },
        },

        SPAWN: {
            '65747a5bf623bb09c78405dd': {
                NAME: 'Spawn8',
                DIRECTIONS: [BOTTOM_RIGHT, BOTTOM],
                NEAR_BY: [],
                NEXT_BORN: null,
            },
            '658a6918de549c23c7176c15': {
                NAME: 'Spawn12',
                DIRECTIONS: [BOTTOM_RIGHT, BOTTOM],
                NEAR_BY: [],
                NEXT_BORN: null,
            },
            '65afe4c400f7ca8b0fafb025': {
                NAME: 'Spawn19',
                DIRECTIONS: [BOTTOM_RIGHT, BOTTOM],
                NEAR_BY: [],
                NEXT_BORN: null,
            },
        },

        STORAGE: {
            '6575a2baf73fe8a24192ab7e': {}
        },

        TERMINAL: {
            '657dd15235c0616e428da9ec': {
                ORDER_ID: '',
                TARGET: '',
                COAST: 0,
                COVER: false,
                ORDER_CONTENT: {},
            }
        },

        TOWER: {
            '6576a6596b8ddd65d1b85b2c': {
                REMARK: '(17,27)',
            },
            '65748f1d2759fb0085c36d8f': {
                REMARK: '(13,20)'
            },
            '658a62c7c665f0964cdf682b': {
                REMARK: '(17,21)'
            },
            '65b01ad25e5588c53bcee8cb': {
                REMARK: '(21,21)'
            },
            '65b0b779b17c4d8aeda5f2d0': {
                REMARK: '(23,22)'
            },
            '65b0f9f746bfcc9289b3fc68': {
                REMARK: '(21,27)'
            },
        },

    }
}

module.exports = E19N26;
