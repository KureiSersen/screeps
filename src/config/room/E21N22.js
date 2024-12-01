
'use strict';
var ROOM_NAME = 'E21N22'
var CONTROLLER_ROOM_NAME = 'E21N22'


var E21N22 = {
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
            HANG_POS: [40, 23, ROOM_NAME],
            ENERGY_SOURCE: ['6582ef1af8c0188689d8ef87'],
            ENERGY_DESTINATION: ['6582ef1af8c0188689d8ef87'],
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
            HANG_POS: [20, 16, ROOM_NAME],
            ENERGY_SOURCE: ['6585c837e468b24a33a8c3fb'],
            ENERGY_DESTINATION: ['6582ef1af8c0188689d8ef87'],
            BODY: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        },
        DEFENDER: {
            ROLE: 'defender_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 0,
            FACT_NUMBER: 0,
            HANG_POS: [37, 37, ROOM_NAME],
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
            ENERGY_SOURCE: ['6582ef1af8c0188689d8ef87'],
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
            HANG_POS: [30, 42, ROOM_NAME],
            ENERGY_SOURCE: ['6585761a58ea07a4fcf7b6ff'],
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
            '65b864483268adba12525738': {},
            '65b860c8aedc990c925c0e94': {},
            '6585c837e468b24a33a8c3fb': {},
        },

        CONTROLLER: { '5bbcae249099fc012e63875a': {} },

        EXTENSION: {
            '65810871d13c8de2a409f0e9': {
                REMARK: '(36,21)'
            },
            '65810caeb2ef7d35203849a8': {
                REMARK: '(35,20)'
            },
            '658116ad7bd93c94c3c09782': {
                REMARK: '(35,19)'
            },
            '65811d6b0ef9e55f47f57882': {
                REMARK: '(34,19)'
            },
            '6581274d75f4b7ac6dc3759a': {
                REMARK: '(34,18)'
            },
            '6581a5dc78d3ae88fc76ed42': {
                REMARK: '(33,18)'
            },
            '6581aca0aac3f7576abe616b': {
                REMARK: '(33,17)'
            },
            '6581b626e2a2f9786356db2c': {
                REMARK: '(32,17)'
            },
            '6581bcf5d0a897b71b8364b7': {
                REMARK: '(32,16)'
            },
            '6581c5dc2e87b0bfefff120d': {
                REMARK: '(31,16)'
            },
            '6582f2b76701ff2dcd5b13cf': {
                REMARK: '(31,15)'
            },
            '6582f8484a8d81fcc05f8260': {
                REMARK: '(30,15)'
            },
            '6582fbbfc9d00e7bc96d5799': {
                REMARK: '(30,14)'
            },
            '6582feb60aae090ec1adfbec': {
                REMARK: '(29,14)'
            },
            '65830210dad82707f1b53ec6': {
                REMARK: '(29,13)'
            },
            '658305065ebeb3a4ddedc485': {
                REMARK: '(28,13)'
            },
            '65830a9f1752f47854e55395': {
                REMARK: '(28,12)'
            },
            '65830d7b4678b0a0f4c6c1d9': {
                REMARK: '(26,13)'
            },
            '6583107186bd15b863613ab5': {
                REMARK: '(26,14)'
            },
            '65831f014dcd4607cf04fb9d': {
                REMARK: '(27,14)'
            },
            '65857d5741fe58fc8964750e': {
                REMARK: '(27,15)'
            },
            '65858f93612a4c53d8b69a39': {
                REMARK: '(28,15)'
            },
            '65857f6e43dcf012b51a2534': {
                REMARK: '(28,16)'
            },
            '658592c6ea2eef07a385b71d': {
                REMARK: '(29,16)'
            },
            '658581b91a22a587d97be27d': {
                REMARK: '(29,17)'
            },
            '658594e24cd09f78afaa7716': {
                REMARK: '(30,17)'
            },
            '658583efd821393f6d63c723': {
                REMARK: '(30,18)'
            },
            '6585976e1dd3522573939a70': {
                REMARK: '(31,18)'
            },
            '658585f8d9ef91b23e7592f7': {
                REMARK: '(31,19)'
            },
            '6585997561621634c056ec56': {
                REMARK: '(32,19)'
            },
            '658a574801edee19caccb503': {
                REMARK: '(32,20)'
            },
            '658a587bbbc9dae6f62a3ac4': {
                REMARK: '(33,20)'
            },
            '658a59b216165fdf4a5b9894': {
                REMARK: '(33,21)'
            },
            '658a5ae52b84a90e38e02189': {
                REMARK: '(34,21)'
            },
            '658a5c1c2ed6b8625ea1f542': {
                REMARK: '(34,22)'
            },
            '658a5d58752a130b20a54cd2': {
                REMARK: '(35,22)'
            },
            '658a5e90bbc9da77b92a3c9e': {
                REMARK: '(35,23)'
            },
            '658a5fd6342b154e8bfb8998': {
                REMARK: '(36,23)'
            },
            '658aeb296d93dd512f94d049': {
                REMARK: '(37,17)'
            },
            '658aed0ee15cac138fb1a056': {
                REMARK: '(36,16)'
            },
            '659ab1fca85f80671538a6e0': {
                REMARK: '(36,15)'
            },
            '659ab38b40f1b77ecbda14c2': {
                REMARK: '(35,15)'
            },
            '659ab50c9428b364bae3c3dc': {
                REMARK: '(35,14)'
            },
            '659ab669568de63cbd60317c': {
                REMARK: '(34,14)'
            },
            '659ab7ea80da80a104a2643d': {
                REMARK: '(34,13)'
            },
            '659ab952c366e2a03288e3e6': {
                REMARK: '(33,13)'
            },
            '659abacf4c2a18b3f30a38e4': {
                REMARK: '(33,12)'
            },
            '659abc4e359488da6cc32333': {
                REMARK: '(31,14)'
            },
            '659abdcaf98c8a0b8c963b74': {
                REMARK: '(32,14)'
            },
            '659abf2cf51770fa691fa444': {
                REMARK: '(32,15)'
            },
        },

        FACTORY: {},

        LAB: {},

        LINK: {
            '65858c9367c796054d987cf7': {
                TARGET: ['6585761a58ea07a4fcf7b6ff'],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: true,
                REMARK: '(37,24)'
            },

            '6585761a58ea07a4fcf7b6ff': {
                TARGET: [],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: false,
                REMARK: '(29,41)'
            },
            '658adf0bdceb8401b34f1130': {
                TARGET: ['65858c9367c796054d987cf7', '6585761a58ea07a4fcf7b6ff'],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: false,
                REMARK: '(3,16)'
            },
            '659ab063db25a6a1d8f2ba0e': {
                TARGET: ['65858c9367c796054d987cf7', '6585761a58ea07a4fcf7b6ff'],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: false,
                REMARK: '(28,7)'
            },
        },

        MINERAL: {
            '5bbcb38c40062e4259e944c5': {
                HAVEST_POS: [18, 19, ROOM_NAME],
                WORKER_NUMBER: 0,
                RESOURCES_TYPE: RESOURCE_UTRIUM,
                CONTAINER: '65b86a9da8aba381ddf28d7d',
            },
        },

        NUKER: {},

        OBSERVER: {},

        POWERSPAWN: {},

        SOURCE: {
            '5bbcae249099fc012e638759': {
                HAVEST_POS: [4, 15, ROOM_NAME],
                WORKER_NUMBER: 1,
                RESOURCES_TYPE: RESOURCE_ENERGY,
                CONTAINER: '65b864483268adba12525738',
                LINK: '658adf0bdceb8401b34f1130',
            },
            '5bbcae249099fc012e638758': {
                HAVEST_POS: [27, 8, ROOM_NAME],
                WORKER_NUMBER: 1,
                RESOURCES_TYPE: RESOURCE_ENERGY,
                CONTAINER: '65b860c8aedc990c925c0e94',
                LINK: '659ab063db25a6a1d8f2ba0e',
            },
        },

        SPAWN: {
            '65808e1f6e7e46c1c07a1b23': {
                NAME: 'Spawn9',
                DIRECTIONS: [BOTTOM_RIGHT, BOTTOM],
                NEAR_BY: [],
                NEXT_BORN: null,
            },
            '659acac209446db99bf92cd0': {
                NAME: 'Spawn15',
                DIRECTIONS: [BOTTOM_RIGHT, BOTTOM],
                NEAR_BY: [],
                NEXT_BORN: null,
            },
        },

        STORAGE: {
            '6582ef1af8c0188689d8ef87': {}
        },

        TERMINAL: {
            '658ad9cfc113b30dfb200ad3': {
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
            '6581d62b78d3ae217c76fabc': {
                REMARK: '(36,24)',
            },
            '65857aa7ea95d738c89fa83a': {
                REMARK: '(27,12)',
            },
            '659ac2c5c787dd7a33391486': {
                REMARK: '(30,9)',
            }
        },

    }
}

module.exports = E21N22;
