'use strict';
var ROOM_NAME = 'E18N25'
var CONTROLLER_ROOM_NAME = ROOM_NAME


var E18N25 = {
    // 房间名称
    ROOM_NAME: ROOM_NAME,

    // 预定还是实际控制
    RESERVE_OR_CONTROL: 'CONTROL',

    // 实际控制房间名称
    CONTROLLER_ROOM_NAME: CONTROLLER_ROOM_NAME,

    // 墙壁血条厚度
    WALL_RAMPART_HITS: 200000,

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
        MAINTAINER: {
            ROLE: 'maintainer_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 2,
            FACT_NUMBER: 0,
            HANG_POS: [20, 28, ROOM_NAME],
            ENERGY_SOURCE: ['652e459ecb8a2419aaadaca0'],
            ENERGY_DESTINATION: ['652e459ecb8a2419aaadaca0'],
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
            HANG_POS: [42, 13, ROOM_NAME],
            ENERGY_SOURCE: ['6530f921f0bbc856d91fae6b'],
            ENERGY_DESTINATION: ['652e459ecb8a2419aaadaca0'],
            BODY: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        },
        DEFENDER: {
            ROLE: 'defender_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 0,
            FACT_NUMBER: 0,
            HANG_POS: [20, 28, ROOM_NAME],
            BODY: [TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE],
        },
        BUILDER: {
            ROLE: 'builder_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 0,
            FACT_NUMBER: 0,
            HANG_POS: [20, 28, ROOM_NAME],
            ENERGY_SOURCE: ['652e459ecb8a2419aaadaca0'],
            ENERGY_DESTINATION: [],
            BODY: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
        },
        UPGRADER: {
            ROLE: 'upgrader_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 1,
            FACT_NUMBER: 0,
            HANG_POS: [11, 39, ROOM_NAME],
            ENERGY_SOURCE: ['65523cb0e834a83ce990c526'],
            ENERGY_DESTINATION: [],
            BODY: [WORK, CARRY, MOVE],
        },

        
        // 战列队伍
        DOWNGRADER: {
            ROLE: 'downgrader_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 0,
            FACT_NUMBER: 0,
            BODY: [CLAIM, MOVE],
        },

        SCOUT: {
            ROLE: 'scout_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 0,
            FACT_NUMBER: 0,
            BODY: [MOVE, ATTACK],
        },

        SCOFFER: {
            ROLE: 'scoffer_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 0,
            FACT_NUMBER: 0,
            BODY: [TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, HEAL, MOVE, HEAL, MOVE, HEAL, MOVE, HEAL, MOVE, HEAL, MOVE, HEAL, MOVE, HEAL, MOVE],
        },

        NESTDESTROYER: {
            ROLE: 'nestdestroyer_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 0,
            FACT_NUMBER: 0,
            BODY: [RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE,],
        },

        SABOTEUR: {
            ROLE: 'saboteur_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 0,
            FACT_NUMBER: 0,
            BODY: [WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE],
        },
    },

    // 建筑编队
    STRUCTURE_TEAMS: {
        CONTAINER: {
            '6520e5fda275150dc712112b': {},
            '65207e47f4f64a858e3aae5a': {},
            '6530f921f0bbc856d91fae6b': {},
        },

        CONTROLLER: { '5bbcadfa9099fc012e6383bf': {} },

        EXTENSION: {
            '652d5340ae7d6d606c3f1c2a': {
                REMARK: '(11,19)'
            },

            '652d55c7ec594c6ad02510a6': {
                REMARK: '(10,18)'
            },

            '652d571dbd1d281e204e6dcd': {
                REMARK: '(10,17)'
            },

            '652d5890677eb59ea38a3611': {
                REMARK: '(9,17)'
            },

            '652d5a37ef24a352b2d1678a': {
                REMARK: '(7,18)'
            },

            '652d5baed11717c5d5097aac': {
                REMARK: '(8,18)'
            },

            '652d5d5b36d4d9138c19b8d9': {
                REMARK: '(8,19)'
            },

            '652d5ee34915c8c6a2763924': {
                REMARK: '(9,19)'
            },

            '652d7f022fab58ea9f7059f7': {
                REMARK: '(9,20)'
            },

            '652d80888d896064f6b09791': {
                REMARK: '(10,20)'
            },

            '652d820510ae7800ec424021': {
                REMARK: '(10,21)'
            },

            '652d836f7df69c57c31b1d0b': {
                REMARK: '(11,21)'
            },

            '652d8516bd1d282a924e7a37': {
                REMARK: '(12,25)'
            },

            '652d86c237ebed68ef006535': {
                REMARK: '(12,24)'
            },

            '652d8839ade23407f2273eaf': {
                REMARK: '(11,24)'
            },

            '652d89b18b9e0990d1d8cb1b': {
                REMARK: '(11,23)'
            },

            '652d8b7c0f5f4167df229b21': {
                REMARK: '(10,23)'
            },

            '652d8cf8cd129d6644662073': {
                REMARK: '(10,22)'
            },

            '652de30509a7f299d6f15c30': {
                REMARK: '(9,22)'
            },

            '652de4efd51f3570d99b3e51': {
                REMARK: '(9,21)'
            },

            '652de6fc3d27d885c98760cc': {
                REMARK: '(8,21)'
            },

            '652de926bd37a6e9a3242a74': {
                REMARK: '(8,20)'
            },

            '652deb227ecdaea7351f38d5': {
                REMARK: '(7,20)'
            },

            '652dece7a5f14d8a48bf63d4': {
                REMARK: '(7,19)'
            },

            '655de36bc95b90d732834672': {
                REMARK: '(6,21)'
            },
            '655de236e6340404ea8f6992': {
                REMARK: '(6,22)'
            },
            '655de02e0d10ac15be768ef8': {
                REMARK: '(7,22)'
            },
            '655ddead68979c077c256e53': {
                REMARK: '(7,23)'
            },
            '652def278e182f5234763490': {
                REMARK: '(8,23)'
            },

            '652df17e31da6f8872477a8e': {
                REMARK: '(8,24)'
            },

            '652df3add65ed25f1ceaa2b2': {
                REMARK: '(9,24)'
            },

            '652e0a96a3a9df277a89fba8': {
                REMARK: '(9,25)'
            },

            '652e1159a3a9df1add89fd51': {
                REMARK: '(10,25)'
            },

            '652e13387ccd7a44105bfda4': {
                REMARK: '(10,26)'
            },

            '652e151331da6f2185478392': {
                REMARK: '(11,26)'
            },

            '652e170c8b9e092aded8f21a': {
                REMARK: '(11,27)'
            },

            '652e1901c7a5a7b904b43dad': {
                REMARK: '(12,27)'
            },

            '652e1b08859c25003ec3012a': {
                REMARK: '(12,28)'
            },

            '652e2003f9339e907d82d5bf': {
                REMARK: '(14,25)'
            },

            '652e21a056734cbfec0cf51b': {
                REMARK: '(14,24)'
            },

            '652e23128e643411cf2bfaa0': {
                REMARK: '(15,24)'
            },

            '652e24b37a7cbe03c28a3c42': {
                REMARK: '(15,23)'
            },

            '652ea856cd129ddd47666d8c': {
                REMARK: '(16,23)'
            },

            '652ea9ab0126bb2ab4aafb90': {
                REMARK: '(16,22)'
            },

            '6538a7d331da6f20c74a0eca': {
                REMARK: '(17,22)'
            },

            '6538a92c90c06dac1fbbe904': {
                REMARK: '(17,21)'
            },

            '6538aa4c0126bbb76ead9593': {
                REMARK: '(18,21)'
            },

            '6538aaeb8d8960d12db382ec': {
                REMARK: '(18,20)'
            },

            '6538abb98021e99002b702b1': {
                REMARK: '(19,20)'
            },

            '6538ac877df69cbe811dec20': {
                REMARK: '(19,19)'
            },

            '6538ad827ecdae0ca8221b32': {
                REMARK: '(18,23)'
            },

            '6538aedd8b9e094669dbc94b': {
                REMARK: '(18,24)'
            },

            '6538af9792dc35f589a00a40': {
                REMARK: '(17,24)'
            },

            '6538b0791e110d02f497c9d8': {
                REMARK: '(17,25)'
            },
            '655dd624014b9469c93d69c5': {
                REMARK: '(16,25)'
            },
            '655dd778660ec39609807008': {
                REMARK: '(16,26)'
            },
            '655dd8769202d960d1d70c13': {
                REMARK: '(15,26)'
            },
            '655dd9ffbc25041b5c38663f': {
                REMARK: '(15,27)'
            },
            '655ddb2dd1665c2f1642d9b7': {
                REMARK: '(14,27)'
            },
            '655ddd1d5c209e3ff3195360': {
                REMARK: '(14,28)'
            },
        },

        FACTORY: {},

        LAB: {},

        LINK: {
            '652cd66347ef538262180ea0': {
                TARGET: ['65523cb0e834a83ce990c526'],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: true,
                REMARK: '(12,22)'
            },

            '65523cb0e834a83ce990c526': {
                TARGET: [],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: false,
                REMARK: '(10,39)'
            },

            '65407a9f7a7cbe1e088ec9e0': {
                TARGET: ['652cd66347ef538262180ea0', '65523cb0e834a83ce990c526'],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: false,
                REMARK: '(45,11)'
            },

            '655e03a506f48966593e7f82': {
                TARGET: ['652cd66347ef538262180ea0', '65523cb0e834a83ce990c526'],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: false,
                REMARK: '(9,43)'
            },
        },

        MINERAL: {
            '5bbcb37340062e4259e943ea': {
                HAVEST_POS: [40, 18, ROOM_NAME],
                WORKER_NUMBER: 0,
                RESOURCES_TYPE: RESOURCE_OXYGEN,
                CONTAINER: '6530f921f0bbc856d91fae6b',
            },
        },

        NUKER: {
            '655e3a9041c48b4fe118c87d': {
                ENABLE: false,
                ORDER_CONTENT: {
                    /**RESOURCE_ENERGY:1000,
                     * RESOURCE_ANOTHER:1000, */
                },
            }
        },

        OBSERVER: {
            '655dfd797212cb407621c06e': {
                NEXT_ROOM: '',
            }
        },

        POWERSPAWN: {
            '655f2a5d853bea455c48b61b': {
                ENABLE: false,
                ORDER_CONTENT: {
                    /**RESOURCE_ENERGY:1000,
                     * RESOURCE_ANOTHER:1000, */
                },
            },
        },

        SOURCE: {
            '5bbcadfa9099fc012e6383be': {
                HAVEST_POS: [44, 11, ROOM_NAME],
                WORKER_NUMBER: 1,
                RESOURCES_TYPE: RESOURCE_ENERGY,
                CONTAINER: '6520e5fda275150dc712112b',
                LINK: '65407a9f7a7cbe1e088ec9e0',
            },

            '5bbcadfa9099fc012e6383c0': {
                HAVEST_POS: [9, 42, ROOM_NAME],
                WORKER_NUMBER: 1,
                RESOURCES_TYPE: RESOURCE_ENERGY,
                CONTAINER: '65207e47f4f64a858e3aae5a',
                LINK: '655e03a506f48966593e7f82',
            },
        },

        SPAWN: {
            '651edabf7f3cad859cce75c6': {
                NAME: 'Spawn1',
                DIRECTIONS: [BOTTOM_RIGHT, BOTTOM],
                NEAR_BY: [],
                NEXT_BORN: null,
            },

            '6539216910ae781214453554': {
                NAME: 'Spawn4',
                DIRECTIONS: [BOTTOM_RIGHT, BOTTOM],
                NEAR_BY: [],
                NEXT_BORN: null,
            },

            '655de65b179ebaa9d5c0c5d5': {
                NAME: 'Spawn7',
                DIRECTIONS: [BOTTOM_RIGHT, BOTTOM],
                NEAR_BY: [],
                NEXT_BORN: null,
            },
        },

        STORAGE: {
            '652e459ecb8a2419aaadaca0': {},
        },

        TERMINAL: {
            '652d4c56733df6ba2d3efa79': {
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
            '652e0d178919c328e8325a54': {
                REMARK: '(11,22)',
            },

            '652e1ddcacb63c06f6a57e9e': {
                REMARK: '(7,17)',
            },

            '6538a68115eba1c543fac180': {
                REMARK: '(12,17)'
            },
            '655df8cc576e284a97e363be': {
                REMARK: '(14,17)'
            },
            '655dfa55c0a943867341728d': {
                REMARK: '(19,17)'
            },
            '655dfb51c0631da85b21f54b': {
                REMARK: '(15,22)'
            },
        },
    }
}

module.exports = E18N25;