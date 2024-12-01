'use strict';
var ROOM_NAME = 'E13N26'
var CONTROLLER_ROOM_NAME = 'E13N26'


var E13N26 = {
    // 房间名称
    ROOM_NAME: ROOM_NAME,

    // 预定还是实际控制
    RESERVE_OR_CONTROL: 'CONTROL',

    // 实际控制房间名称
    CONTROLLER_ROOM_NAME: CONTROLLER_ROOM_NAME,

    // 墙壁血条厚度
    WALL_RAMPART_HITS: 0,

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
            HANG_POS: [22, 35, ROOM_NAME],
            ENERGY_SOURCE: ['65accb0a86f7f311f9a46fa6'],
            ENERGY_DESTINATION: ['65accb0a86f7f311f9a46fa6'],
            BODY: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
        },
        DEFENDER: {
            ROLE: 'defender_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 0,
            FACT_NUMBER: 0,
            HANG_POS: [16, 13, ROOM_NAME],
            BODY: [TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE],
        },
        HARVESTER: {
            ROLE: 'harvester_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 0,
            FACT_NUMBER: 0,
            HANG_POS: [15, 18, ROOM_NAME],
            ENERGY_SOURCE: [],
            ENERGY_DESTINATION: [],
            BODY: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
        },
        CARRIER: {
            ROLE: 'carrier_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 2,
            FACT_NUMBER: 0,
            HANG_POS: [13, 24, ROOM_NAME],
            ENERGY_SOURCE: [],
            ENERGY_DESTINATION: ['65accb0a86f7f311f9a46fa6'],
            BODY: [
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
            ],
        },
        BUILDER: {
            ROLE: 'builder_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 0,
            FACT_NUMBER: 0,
            HANG_POS: [30, 13, ROOM_NAME],
            ENERGY_SOURCE: [],
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
            HANG_POS: [42, 27, ROOM_NAME],
            ENERGY_SOURCE: ['65b135d1facec50934c8e8be'],
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
        CONTAINER: {},

        CONTROLLER: { '5bbcadad9099fc012e6379f0': {} },

        EXTENSION: {
            '65aba5b5b017403257640476': {
                REMARK: '(20,34)'
            },
            '65abacabbf17e5ac119a6712': {
                REMARK: '(21,33)'
            },
            '65abb2a70da69ddd17fe4fa7': {
                REMARK: '(21,32)'
            },
            '65abb6dc6389c75e68e37e8d': {
                REMARK: '(22,32)'
            },
            '65abbcaf66e19058ee4ca0d7': {
                REMARK: '(22,31)'
            },
            '65abc53f1a6f52281891c454': {
                REMARK: '(23,31)'
            },
            '65abcc0574157615f213c1c4': {
                REMARK: '(23,30)'
            },
            '65abd30b80b67d7d7f3dc278': {
                REMARK: '(24,30)'
            },
            '65abd66d21b96aed711c6586': {
                REMARK: '(24,29)'
            },
            '65abe00aec24ff380b70a4a8': {
                REMARK: '(25,29)'
            },
            '65acdfea0a153923fa192080': {
                REMARK: '(25,28)'
            },
            '65ace3429179224bf83ecbfd': {
                REMARK: '(26,28)'
            },
            '65aceed6c7abc2df99778d11': {
                REMARK: '(26,27)'
            },
            '65acf283a9816141122823ea': {
                REMARK: '(27,27)'
            },
            '65acf7e0f9aa51aade7b4e07': {
                REMARK: '(27,26)'
            },
            '65ad0f7c86f7f39dafa48214': {
                REMARK: '(28,26)'
            },
            '65ad201f2b0cae989247dc58': {
                REMARK: '(29,28)'
            },
            '65ad2d0db525d18cd34db428': {
                REMARK: '(28,28)'
            },
            '65ad3cee5f4acc0a644ca0d3': {
                REMARK: '(28,29)'
            },
            '65ad4ba2d50187e43a407148': {
                REMARK: '(27,29)'
            },
            '65b16ba1ca3e31f06b32486a': {
                REMARK: '(27,30)'
            },
            '65b1782ce9a32a2a00b29153': {
                REMARK: '(26,30)'
            },
            '65b17d7a4408248266682d23': {
                REMARK: '(26,31)'
            },
            '65b18269415c925d7bfe3a41': {
                REMARK: '(25,31)'
            },
            '65b188e45e55888f80cf49b2': {
                REMARK: '(25,32)'
            },
            '65b18f0b7db6b65f63932e15': {
                REMARK: '(24,32)'
            },
            '65b195e05ce81403f5146a62': {
                REMARK: '(24,33)'
            },
            '65b19ba94a2316dc7de39b68': {
                REMARK: '(23,33)'
            },
            '65b19fe3e9668d7712822665': {
                REMARK: '(23,34)'
            },
            '65b1a6b4d04d886843913d83': {
                REMARK: '(22,34)'
            },
            '65b518e943207d51c90e9db8': {
                REMARK: '(22,35)'
            },
            '65b5af6de1fa9b56eea06d3d': {
                REMARK: '(21,35)'
            },
            '65b5b3ed9b048a3f6c3d505a': {
                REMARK: '(21,36)'
            },
            '65b5b7d1fd74258bbbae5971': {
                REMARK: '(20,36)'
            },
            '65b5bbc7e1fa9b4e07a070bb': {
                REMARK: '(17,32)'
            },
            '65b5c003da3e88b953a4b415': {
                REMARK: '(17,31)'
            },
            '65b5c2a7594a4d32a47178a4': {
                REMARK: '(18,31)'
            },
            '65b5c4c8bee9020554892c34': {
                REMARK: '(18,30)'
            },
            '65b5c744594a4d52987179cc': {
                REMARK: '(19,30)'
            },
            '65b5d4570771cedfdd8de98a': {
                REMARK: '(19,29)'
            },
        },

        FACTORY: {},

        LAB: {},

        LINK: {
            '65b13caf65b9a045e7cbf4fa': {
                TARGET: ['65b135d1facec50934c8e8be'],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: true,
                REMARK: '(19,37)'
            },
            '65b135d1facec50934c8e8be': {
                TARGET: [],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: false,
                REMARK: '(43,26)'
            },
            '65b5a93e58d1f7637373a591': {
                TARGET: ['65b13caf65b9a045e7cbf4fa', '65b135d1facec50934c8e8be'],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: false,
                REMARK: '(16,18)'
            },
        },

        MINERAL: {},

        NUKER: {},

        OBSERVER: {},

        POWERSPAWN: {},

        SOURCE: {
            '5bbcadad9099fc012e6379ef': {
                HAVEST_POS: [15, 18, ROOM_NAME],
                WORKER_NUMBER: 1,
                RESOURCES_TYPE: RESOURCE_ENERGY,
                CONTAINER: '',
                LINK: '65b5a93e58d1f7637373a591',
            },
            '5bbcadad9099fc012e6379f1': {
                HAVEST_POS: [12, 37, ROOM_NAME],
                WORKER_NUMBER: 1,
                RESOURCES_TYPE: RESOURCE_ENERGY,
                CONTAINER: '',
                LINK: '',
            },
        },

        SPAWN: {
            '65ab9919ffef0c56949dfa7d': {
                NAME: 'Spawn18',
                DIRECTIONS: [BOTTOM_RIGHT, BOTTOM],
                NEAR_BY: [],
                NEXT_BORN: null,
            },
        },

        STORAGE: {
            '65accb0a86f7f311f9a46fa6': {}
        },

        TERMINAL: {
            '65b5a41ef7a3056403849549': {
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
            '65abc1a90f2df75b46ba6f00': {
                REMARK: '(20,37)',
            },
            '65b14414415c9232cbfe2a24': {
                REMARK: '(29,27)',
            },
        },

    }
}

module.exports = E13N26;
