var roleMiner = require('role.miner');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleTowerRecharger = require('role.tower_recharger');
var towers = require('towers');
var spawner = require('spawner');

module.exports.loop = function () {
    // Do defense actions with towers
    var hostiles = Game.spawns[spawnName].room.find(FIND_HOSTILE_CREEPS);
    if (hostiles.length > 0) {
        towers.defend(Game.spawns[spawnName].room, 1)
    }
    else{
        towers.heal(Game.spawns[spawnName].room);
    }


    // Memory clearing
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    // Spawning creeps
    spawner.spawn();

    // running creeps control modules
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'recharger') {
            roleTowerRecharger.run(creep);
        }
    }
}