'use strict';
var ROOM_NAME = 'E18N24'
var CONTROLLER_ROOM_NAME = 'E18N24'


var E18N24 = {
    // 房间名称
    ROOM_NAME: ROOM_NAME,

    // 预定还是实际控制
    RESERVE_OR_CONTROL: 'CONTROL',

    // 实际控制房间名称
    CONTROLLER_ROOM_NAME: CONTROLLER_ROOM_NAME,

    // 墙壁血条厚度
    WALL_RAMPART_HITS: 100000,

    // 避难所
    REFUGE: [14, 27, CONTROLLER_ROOM_NAME],

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
            HANG_POS: [24, 14, ROOM_NAME],
            ENERGY_SOURCE: ['65354781bd37a601e2262399'],
            ENERGY_DESTINATION: ['65354781bd37a601e2262399'],
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
            HANG_POS: [13, 26, ROOM_NAME],
            ENERGY_SOURCE: ['653fe88bbd1d28375f533ad1'],
            ENERGY_DESTINATION: ['65354781bd37a601e2262399'],
            BODY: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        },
        DEFENDER: {
            ROLE: 'defender_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 0,
            FACT_NUMBER: 0,
            HANG_POS: [13, 26, ROOM_NAME],
            BODY: [TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE],
        },
        BUILDER: {
            ROLE: 'builder_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 0,
            FACT_NUMBER: 0,
            HANG_POS: [13, 26, ROOM_NAME],
            ENERGY_SOURCE: ['65354781bd37a601e2262399'],
            ENERGY_DESTINATION: [],
            BODY: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
        },
        UPGRADER: {
            ROLE: 'upgrader_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 1,
            FACT_NUMBER: 0,
            HANG_POS: [12, 17, ROOM_NAME],
            ENERGY_SOURCE: ['653a0e2bc4f3bd6f02d4548f'],
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
            '65b734cc2bc6bca1661ce6ad': {},
            '65b7378572eeb1fd6a3271b7': {},
            '653fe88bbd1d28375f533ad1': {},
        },

        CONTROLLER: { '5bbcadfa9099fc012e6383c2': {} },

        EXTENSION: {
            '65341fc6d8967783c6402647': {
                REMARK: '(22,17)'
            },

            '65342df27df69c0afd1ccdcd': {
                REMARK: '(21,16)'
            },

            '653433dbcd129db9ab67e9bf': {
                REMARK: '(21,15)'
            },

            '653438a68d8960798cb25af2': {
                REMARK: '(20,15)'
            },

            '6534aa358b9e09665bdab7bb': {
                REMARK: '(19,16)'
            },

            '6534ade8d0a9c368fecd7eb0': {
                REMARK: '(19,17)'
            },

            '6534b229e4ef00d239c0297a': {
                REMARK: '(20,17)'
            },

            '6534b65a0126bb2fceac9004': {
                REMARK: '(20,18)'
            },

            '6534c26acb8a24ccfcaf6abf': {
                REMARK: '(21,18)'
            },

            '6534f749ef24a36ffed36fcb': {
                REMARK: '(21,19)'
            },

            '6534fd4468c1fdaefb196eb1': {
                REMARK: '(22,19)'
            },

            '653500be3e19ec73ffe3066f': {
                REMARK: '(23,23)'
            },

            '6535046520aaaba70f48011f': {
                REMARK: '(23,22)'
            },

            '6535076ed0a9c318b6cd9515': {
                REMARK: '(22,22)'
            },

            '65350a89ce5f3115b1c086ac': {
                REMARK: '(22,21)'
            },

            '65350e5d11551309b655624e': {
                REMARK: '(21,21)'
            },

            '653511dd10ae781853442ba1': {
                REMARK: '(21,20)'
            },

            '653514842fab58b2e07256d6': {
                REMARK: '(20,20)'
            },

            '653516fc5830fc5d437909cc': {
                REMARK: '(20,19)'
            },

            '653a0f1856734cd39f1029cc': {
                REMARK: '(19,19)'
            },

            '653a1046ec594ca88f284924': {
                REMARK: '(19,18)'
            },

            '653a1149951a2e79792887ab': {
                REMARK: '(18,18)'
            },

            '653a122037ebed126b03926e': {
                REMARK: '(18,17)'
            },

            '653a1316bca85b7c88acd9ea': {
                REMARK: '(17,17)'
            },

            '653a142a8b9e09ce2adc26d0': {
                REMARK: '(17,19)'
            },

            '653a156856734ce19e102b52': {
                REMARK: '(17,20)'
            },

            '653a164437ebed4a50039386': {
                REMARK: '(18,20)'
            },

            '653a179b95252fd786bcd0ba': {
                REMARK: '(18,21)'
            },

            '653a188337ebed5c4e03941c': {
                REMARK: '(19,21)'
            },

            '653fb2fc951a2e14632a02ac': {
                REMARK: '(19,22)'
            },

            '653fb38e0f89144fe7ea8204': {
                REMARK: '(20,22)'
            },

            '653fb4c33094c772b12e6bc9': {
                REMARK: '(20,23)'
            },

            '653fb55bbca85b0ecbae49ee': {
                REMARK: '(21,23)'
            },

            '653fb758859c258b31c73afa': {
                REMARK: '(21,24)'
            },

            '653fbccde0dbbc3735afa514': {
                REMARK: '(22,24)'
            },

            '653fbf18cbf5a8487a385dca': {
                REMARK: '(20,24)'
            },

            '653fc02e87979f2206d3d227': {
                REMARK: '(19,23)'
            },

            '653fc10ccb8a248b59b249bf': {
                REMARK: '(18,23)'
            },

            '653fc2032f8608a8ef35c408': {
                REMARK: '(18,22)'
            },
            '655200de791f09020e289447': {
                REMARK: '(17,22)'
            },
            '65520231090a403de4debad1': {
                REMARK: '(17,21)'
            },
            '655202f487979f6427d8694c': {
                REMARK: '(25,23)'
            },
            '65520383076fff3c3f936832': {
                REMARK: '(25,22)'
            },
            '655203fe6cc45db1e9155a12': {
                REMARK: '(26,22)'
            },
            '655204707a7cbe4aa3930d73': {
                REMARK: '(26,21)'
            },
            '655204ccc3f343a0fb40be1c': {
                REMARK: '(27,21)'
            },
            '655233c8c7a5a75e85bdd0d3': {
                REMARK: '(27,20)'
            },
            '655234554987870be102c1dc': {
                REMARK: '(28,20)'
            },
            '655234cadf0a1c202f491453': {
                REMARK: '(28,19)'
            },
            '655235632f860820bc3a617d': {
                REMARK: '(29,19)'
            },
            '658800621ee177a319b6fc53': {
                REMARKL: '(29,18)'
            },
            '6588019406dc3a974ab2c959': {
                REMARKL: '(30,18)'
            },
            '658802835ab7265a9e59cae4': {
                REMARKL: '(30,17)'
            },
            '6588037812a01f303b43ac85': {
                REMARKL: '(30,20)'
            },
            '658804b2b818e8292c9d5403': {
                REMARKL: '(30,21)'
            },
            '658805b8aea5359d7aef273b': {
                REMARKL: '(29,21)'
            },
            '658806a961389b1d84ffb10f': {
                REMARKL: '(29,22)'
            },
            '658807a52b84a93c26df8ce9': {
                REMARKL: '(28,22)'
            },
            '658808951414db8c577bc294': {
                REMARKL: '(28,23)'
            },
            '6588097b72c82049461faeca': {
                REMARKL: '(27,23)'
            },
        },

        FACTORY: {},

        LAB: {},

        LINK: {
            '653a0b3abd1d2873f651b999': {
                TARGET: ['653a0e2bc4f3bd6f02d4548f'],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: true,
                REMARK: '(23,20)',
            },

            '653a0e2bc4f3bd6f02d4548f': {
                TARGET: [],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: false,
                REMARK: '(11,18)',
            },

            '65688d2312c1702c5643f1ab': {
                TARGET: ['653a0b3abd1d2873f651b999', '653a0e2bc4f3bd6f02d4548f'],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: false,
                REMARK: '(5,29)',
            },

            '656ac7617e88074650a9a58c': {
                TARGET: ['653a0b3abd1d2873f651b999', '653a0e2bc4f3bd6f02d4548f'],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: false,
                REMARK: '(6,27)',
            },
        },

        MINERAL: {
            '5bbcb37440062e4259e943eb': {
                HAVEST_POS: [11, 43, ROOM_NAME],
                WORKER_NUMBER: 0,
                RESOURCES_TYPE: RESOURCE_OXYGEN,
                CONTAINER: '653fe88bbd1d28375f533ad1',
            },
        },

        NUKER: {
            '6588aaaf342b1583d0fb1245': {
                ENABLE: false,
                ORDER_CONTENT: {
                    /**RESOURCE_ENERGY:1000,
                     * RESOURCE_ANOTHER:1000, */
                },
            }
        },

        OBSERVER: {
            '65887fb8bdfceb37de1c1912': {
                NEXT_ROOM: '',
            }
        },

        POWERSPAWN: {
            '65887b8bde549caca516dfc9': {
                ENABLE: false,
                ORDER_CONTENT: {
                    /**RESOURCE_ENERGY:1000,
                     * RESOURCE_ANOTHER:1000, */
                },
            }
        },

        SOURCE: {
            '5bbcadfa9099fc012e6383c3': {
                HAVEST_POS: [7, 26, ROOM_NAME],
                WORKER_NUMBER: 1,
                RESOURCES_TYPE: RESOURCE_ENERGY,
                CONTAINER: '65b734cc2bc6bca1661ce6ad',
                LINK: '656ac7617e88074650a9a58c',
            },

            '5bbcadfa9099fc012e6383c4': {
                HAVEST_POS: [6, 30, ROOM_NAME],
                WORKER_NUMBER: 1,
                RESOURCES_TYPE: RESOURCE_ENERGY,
                CONTAINER: '65b7378572eeb1fd6a3271b7',
                LINK: '65688d2312c1702c5643f1ab',
            },
        },

        SPAWN: {
            '6534064c7d08b3d75c18eca0': {
                NAME: 'Spawn2',
                DIRECTIONS: [BOTTOM_RIGHT, BOTTOM],
                NEAR_BY: [],
                NEXT_BORN: null,
            },
            '6551ff1f791f0935172893a3': {
                NAME: 'Spawn5',
                DIRECTIONS: [BOTTOM_RIGHT, BOTTOM],
                NEAR_BY: [],
                NEXT_BORN: null,
            },
            '65881c00df3a3940512ea555': {
                NAME: 'Spawn11',
                DIRECTIONS: [BOTTOM_RIGHT, BOTTOM],
                NEAR_BY: [],
                NEXT_BORN: null,
            },
        },

        STORAGE: {
            '65354781bd37a601e2262399': {},
        },

        TERMINAL: {
            '653fa73d24eb87ac7fafff81': {
                ORDER_ID: '',
                TARGET: '',
                COAST: 0,
                COVER: false,
                ORDER_CONTENT: {},
            }
        },

        TOWER: {
            '6534bf5f733df61cbb40ea4c': {
                REMARK: '(22,20)',
            },
            '653a0a6d4915c85c6a79606c': {
                REMARK: '(18,16)',
            },
            '655205f07535d89c3aca2d8c': {
                REMARK: '(22,13)',
            },
            '658815a78c6f81d198ab63b2': {
                REMARK: '(27,13)'
            },
            '6588173aa28f06ab3e3f8a4b': {
                REMARK: '(30,15)'
            },
            '6588ac5fb9e0709c1b5b74da': {
                REMARK: '(26,20)'
            },
        },

    }
}

module.exports = E18N24;


