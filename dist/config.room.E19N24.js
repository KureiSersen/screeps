'use strict';
var ROOM_NAME = 'E19N24'
var CONTROLLER_ROOM_NAME = ROOM_NAME


var E19N24 = {
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
            HANG_POS: [23, 32, ROOM_NAME],
            ENERGY_SOURCE: ['653beeefbd1d28bf0b52372e'],
            ENERGY_DESTINATION: ['653beeefbd1d28bf0b52372e'],
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
            ENERGY_SOURCE: ['65b743deefd49920dd6d6c78'],
            ENERGY_DESTINATION: ['653beeefbd1d28bf0b52372e'],
            HANG_POS: [16, 14, ROOM_NAME],
            BODY: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        },
        DEFENDER: {
            ROLE: 'defender_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 0,
            FACT_NUMBER: 0,
            HANG_POS: [37, 36, ROOM_NAME],
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
            HANG_POS: [16, 25, ROOM_NAME],
            ENERGY_SOURCE: ['653beeefbd1d28bf0b52372e'],
            ENERGY_DESTINATION: [],
            BODY: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
        },
        UPGRADER: {
            ROLE: 'upgrader_' + CONTROLLER_ROOM_NAME + '_' + ROOM_NAME,
            NUMBER: 1,
            FACT_NUMBER: 0,
            HANG_POS: [13, 11, ROOM_NAME],
            ENERGY_SOURCE: ['6542812fae7d6d4f764482ab'],
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
            BODY: [
                WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE,
                WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE,
                WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE,
                WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE,
                WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE,
            ],
        },

    },

    // 建筑编队
    STRUCTURE_TEAMS: {
        CONTAINER: {
            '65b749c1da3e883537a5165d': {},
            '65b747433268adeb46520e4d': {},
            '65b743deefd49920dd6d6c78': {},
        },

        CONTROLLER: { '5bbcae089099fc012e638552': {} },

        EXTENSION: {
            '653ae02f92dc355b5da09a63': {
                REMARK: '(21,34)'
            },

            '653ae4ef3ffc82bab066f583': {
                REMARK: '(20,33)'
            },

            '653aeb23623ff281cf752f65': {
                REMARK: '(20,32)'
            },

            '653af36ac43ca1784751c1d6': {
                REMARK: '(19,32)'
            },

            '653ca9e51e110d0b0398d777': {
                REMARK: '(18,31)'
            },

            '653ccb0237ebed93df044176': {
                REMARK: '(19,34)'
            },

            '653b3e3daae5907467082e3f': {
                REMARK: '(19,35)'
            },

            '653b429b076fff7aec8dac76': {
                REMARK: '(20,35)'
            },

            '653b499556734c04be107e55': {
                REMARK: '(20,36)'
            },

            '653b4dd32f8608f3c134a392': {
                REMARK: '(21,35)'
            },

            '653b5207cbb618ed9bdad0aa': {
                REMARK: '(22,40)'
            },

            '653b569f8b9e0922a9dc7e23': {
                REMARK: '(22,39)'
            },

            '653b89820f8914f9cae96f66': {
                REMARK: '(21,39)'
            },

            '653b947559c22614a082f7b0': {
                REMARK: '(21,38)'
            },

            '653b9abde207c45905498829': {
                REMARK: '(20,38)'
            },

            '653ba0f32e4fb9554d108475': {
                REMARK: '(20,37)'
            },

            '653ba8d02e4fb943c4108684': {
                REMARK: '(19,37)'
            },

            '653baef70b6c8aa42af4920f': {
                REMARK: '(19,36)'
            },

            '653bb41a7535d8084dc45952': {
                REMARK: '(18,38)'
            },

            '654282f4b4f81360a05f0a40': {
                REMARK: '(18,39)'
            },

            '654283a6ec594cb07a2a6a6c': {
                REMARK: '(19,39)'
            },

            '654284980b6c8a82c2f64431': {
                REMARK: '(19,40)'
            },

            '6542856635ce1208c7b51185': {
                REMARK: '(20,40)'
            },

            '65428609d0a9c318f0d0f289': {
                REMARK: '(20,41)'
            },

            '654286b0d65ed2bfaef029fd': {
                REMARK: '(21,41)'
            },

            '6542876c11551303e558d678': {
                REMARK: '(21,42)'
            },

            '6542882e951a2e18122ac0dc': {
                REMARK: '(22,42)'
            },

            '654288f8e4ef003180c3baa3': {
                REMARK: '(22,43)'
            },

            '658cf0612c409c56de929d70': {
                REMARK: '(21,43)'
            },

            '654289dc3d27d85e588ca862': {
                REMARK: '(20,42)'
            },

            '6547c92036d4d9c55f207bb5': {
                REMARK: '(19,41)'
            },

            '6547cb218e182f75207d08fc': {
                REMARK: '(18,41)'
            },

            '6547cc99e0dbbcf3a0b1af13': {
                REMARK: '(18,42)'
            },

            '6547cde995252ff698c03e8c': {
                REMARK: '(18,43)'
            },

            '6547cf623d27d84b6d8df903': {
                REMARK: '(19,43)'
            },

            '658cf19f3d59c0d852006c32': {
                REMARK: '(25,43)'
            },

            '6547d026800862039be899fe': {
                REMARK: '(26,42)'
            },

            '6547d0d83ffc82c1d96a2461': {
                REMARK: '(27,41)'
            },

            '6547d17f7a7cbe1369909190': {
                REMARK: '(28,41)'
            },

            '6547d25b733df6703145bf61': {
                REMARK: '(28,42)'
            },

            '6547d32845f88783fedb693a': {
                REMARK: '(28,43)'
            },

            '655232537535d88123ca3a2a': {
                REMARK: '(27,43)'
            },

            '6559aad2cb2c6e58626cdc1f': {
                REMARK: '(24,40)'
            },

            '6559ab91ae16143902e81ec0': {
                REMARK: '(24,39)'
            },

            '6559ac1d8637165900c76ddf': {
                REMARK: '(25,39)'
            },

            '6559aca4e398ccfeb55b481b': {
                REMARK: '(25,38)'
            },

            '6559ad1daab296f4752fd6ba': {
                REMARK: '(26,38)'
            },

            '6559ad8ecfe49de5a6558405': {
                REMARK: '(26,37)'
            },

            '6559ae375a39988f1c5d919c': {
                REMARK: '(27,37)'
            },

            '6559aec73b66bd056f837cee': {
                REMARK: '(27,36)'
            },

            '6559b03efe279d410430a8c3': {
                REMARK: '(28,38)'
            },

            '6559b26261fd6f92f7feec70': {
                REMARK: '(28,39)'
            },

            '658cf324e2c154ddd39db829': {
                REMARK: '(27,39)'
            },

            '658cf49912a01f120b4511b1': {
                REMARK: '(27,40)'
            },

            '658cf60a2c409c7f64929ef2': {
                REMARK: '(26,40)'
            },

            '658cf76d9e38d286d59934f6': {
                REMARK: '(26,41)'
            },

            '658cf8bb47cc96352048c9a5': {
                REMARK: '(25,41)'
            },

            '658cfb3bb37f009efd4bebff': {
                REMARK: '(25,42)'
            },

            '658cfcf5bbf7558754705c10': {
                REMARK: '(24,42)'
            },

            '658cff4268fb8d6bb2522fb4': {
                REMARK: '(24,43)'
            },
        },

        FACTORY: {},

        LAB: {},

        LINK: {
            '65427bc30b6c8ae29ff64206': {
                TARGET: ['6542812fae7d6d4f764482ab'],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: true,
                REMARK: '(22,37)'
            },

            '6542812fae7d6d4f764482ab': {
                TARGET: [],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: false,
                REMARK: '(14,10)'
            },

            '6568916e1a0ebeb673781f9e': {
                TARGET: ['65427bc30b6c8ae29ff64206', '6542812fae7d6d4f764482ab'],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: false,
                REMARK: '(44,11)'
            },

            '656acaa6c180a90e4ecce8d2': {
                TARGET: ['65427bc30b6c8ae29ff64206', '6542812fae7d6d4f764482ab'],
                ISFULL: false,
                ISEMPTY: false,
                MAIN: false,
                REMARK: '(46,29)'
            },

        },

        MINERAL: {
            '5bbcb37f40062e4259e94457': {
                HAVEST_POS: [18, 13, ROOM_NAME],
                WORKER_NUMBER: 0,
                RESOURCES_TYPE: RESOURCE_LEMERGIUM,
                CONTAINER: '65b743deefd49920dd6d6c78',
            }
        },

        NUKER: {},

        OBSERVER: {},

        POWERSPAWN: {},

        SOURCE: {
            '5bbcae089099fc012e638553': {
                HAVEST_POS: [44, 12, ROOM_NAME],
                WORKER_NUMBER: 1,
                RESOURCES_TYPE: RESOURCE_ENERGY,
                CONTAINER: '65b747433268adeb46520e4d',
                LINK: '6568916e1a0ebeb673781f9e',
            },
            '5bbcae089099fc012e638554': {
                HAVEST_POS: [45, 28, ROOM_NAME],
                WORKER_NUMBER: 1,
                RESOURCES_TYPE: RESOURCE_ENERGY,
                CONTAINER: '65b749c1da3e883537a5165d',
                LINK: '656acaa6c180a90e4ecce8d2',
            },
        },

        SPAWN: {
            '653ac23e0126bb29e7ae1f04': {
                NAME: 'Spawn3',
                DIRECTIONS: [BOTTOM_RIGHT, BOTTOM],
                NEAR_BY: [],
                NEXT_BORN: null,
            },
            '6559bc2816ad879158531e2d': {
                NAME: 'Spawn6',
                DIRECTIONS: [BOTTOM_RIGHT, BOTTOM],
                NEAR_BY: [],
                NEXT_BORN: null,
            },
            '658d0cbec665f0498ee0240f':{
                NAME: 'Spawn13',
                DIRECTIONS: [BOTTOM_RIGHT, BOTTOM],
                NEAR_BY: [],
                NEXT_BORN: null,
            },
        },

        STORAGE: {
            '653beeefbd1d28bf0b52372e': {}
        },

        TERMINAL: {
            '6547c8202e4fb92b1a138b14': {
                ORDER_ID: '',
                TARGET: '',
                COAST: 0,
                COVER: false,
                ORDER_CONTENT: {},
            }
        },

        TOWER: {
            '653b3a99c7a5a774d7b7c19d': {
                REMARK: '(21,37)',
            },
            '65427afe45f8874e70da0cf1': {
                REMARK: '(18,33)',
            },
            '6559b41c652d1ecf6261aee7': {
                REMARK: '(21,31)',
            },
            '658d01e11b5680174c0f8eae': {
                REMARK: '(25,31)',
            },
            '658d04755946d82096d13497': {
                REMARK: '(28,33)'
            },
            '658d06896d93dd10aa9562fc': {
                REMARK: '(25,37)'
            }
        },
    }

}

module.exports = E19N24;