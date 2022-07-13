const spawnName = "Spawn1"
const builders_limit = 1
const miners_limit = 1
const upgraders_limit = 1
const rechargers_limit = 1
const operators_limit = 1

const miner_config = [WORK,WORK,WORK,WORK,MOVE,MOVE]
const upgrader_config = [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE]
const builder_config = [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE]
const recharger_config = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE]
const operator_config = [CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]

var spawner = {

    /** @param {Creep} creep **/
    spawn: function() {
        // Creeps count log
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var rechargers = _.filter(Game.creeps, (creep) => creep.memory.role == 'recharger');
        var operators = _.filter(Game.creeps, (creep) => creep.memory.role == 'operator');
        console.log('Miners: ' + miners.length + "/" + miners_limit+" "+ 'Operators: ' + operators.length + "/" + operators_limit +" "+ 'Upgraders: ' + upgraders.length + "/" + upgraders_limit +" "+'Builders: ' + builders.length + "/" + builders_limit+" "+'Rechargers: ' + rechargers.length + "/" + rechargers_limit);


        // Spawning miners
        if (miners.length <  miners_limit) {
            if(miners.length == 0){
                var newName = 'mini_miner' + Game.time;
                console.log('Spawning new mini_miner: ' + newName);
                Game.spawns[spawnName].spawnCreep(mini_miner_config, newName,
                    { memory: { role: 'miner' } });
            }else{
                var newName = 'miner' + Game.time;
                console.log('Spawning new miner: ' + newName);
                Game.spawns[spawnName].spawnCreep(miner_config, newName,
                    { memory: { role: 'miner' } });
            }
        }

        // Spawning Operators
        if (operators.length < operators_limit) {
            var newName = 'operator' + Game.time;
            console.log('Spawning new operators: ' + newName);
            Game.spawns[spawnName].spawnCreep(operator_config, newName,
                { memory: { role: 'operator' } });
        }
        
        // Spawning Upgraders
        if (upgraders.length < upgraders_limit) {
            var newName = 'upgrader' + Game.time;
            console.log('Spawning new upgraders: ' + newName);
            Game.spawns[spawnName].spawnCreep(upgrader_config, newName,
                { memory: { role: 'upgrader' } });
        }

        // Spawning Rechargers
        if (rechargers.length < rechargers_limit) {
            var newName = 'tower_recharger' + Game.time;
            console.log('Spawning new rechargers: ' + newName);
            Game.spawns[spawnName].spawnCreep(recharger_config, newName,
                { memory: { role: 'recharger' } });
        }

        
        // Spawning Builders
        if (builders.length < builders_limit) {
            var newName = 'builder' + Game.time;
            console.log('Spawning new builder: ' + newName);
            Game.spawns[spawnName].spawnCreep(builder_config, newName,
                { memory: { role: 'builder' } });
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
    }
};

module.exports = spawner;