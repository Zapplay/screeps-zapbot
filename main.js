var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var towers = require('towers');

const spawnBuilders = 1

const spawnName = "Spawn1"
const builders_limit = 1
const harversters_limit = 0
const upgraders_limit = 0

const mini_harverster_config = [WORK,WORK, CARRY, MOVE]
const harverster_config = [WORK,WORK, CARRY, MOVE]
const upgrader_config = [WORK,WORK,CARRY, MOVE]
const builder_config = [WORK,WORK,CARRY, MOVE]


module.exports.loop = function () {
    // Do defense actions with towers
    towers.defend(Game.spawns[spawnName].room, 1)
    
    // Memory clearing
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    // Creeps count log
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Harvesters: ' + harvesters.length + "/" + harversters_limit+" "+ 'Upgraders: ' + upgraders.length + "/" + upgraders_limit +" "+'Builders: ' + builders.length + "/" + builders_limit);


    // Spawning Harvesters
    if (harvesters.length <  harversters_limit) {
        if(harvesters.length == 0){
            var newName = 'mini_harvester' + Game.time;
            console.log('Spawning new mini_harvester: ' + newName);
            Game.spawns[spawnName].spawnCreep(mini_harverster_config, newName,
                { memory: { role: 'harvester' } });
        }else{
            var newName = 'harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns[spawnName].spawnCreep(harverster_config, newName,
                { memory: { role: 'harvester' } });
        }
    }
    else{
        // Spawning Upgraders
        if (upgraders.length < upgraders_limit) {
            var newName = 'upgrader' + Game.time;
            console.log('Spawning new upgraders: ' + newName);
            Game.spawns[spawnName].spawnCreep(upgrader_config, newName,
                { memory: { role: 'upgrader' } });
        }
    }
    if(spawnBuilders){
        // Spawning Builders
        if (builders.length < builders_limit) {
            var newName = 'builder' + Game.time;
            console.log('Spawning new builder: ' + newName);
            Game.spawns[spawnName].spawnCreep(builder_config, newName,
                { memory: { role: 'builder' } });
        }
    }


    // Spawning message
    if (Game.spawns[spawnName].spawning) {
        var spawningCreep = Game.creeps[Game.spawns[spawnName].spawning.name];
        Game.spawns[spawnName].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns[spawnName].pos.x + 1,
            Game.spawns[spawnName].pos.y,
            { align: 'left', opacity: 0.8 });
    }

    // runing creeps control modules
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}
