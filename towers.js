const wall_repair_limit = 300000;

var towers = {
    heal: function (room) {
        
        var towers = room.find(
                FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
            
        
        // repair any damaged structures to 5000 hits and repair containers to max hits
        const targets = room.find(FIND_STRUCTURES, {
            filter: object => (object.hits < object.hitsMax && object.hits < 5000) || (object.structureType == STRUCTURE_CONTAINER && object.hits < object.hitsMax)
        });
        
        targets.sort((a,b) => a.hits - b.hits);
            
        if(targets.length > 0) {
            towers.forEach(tower => tower.repair(targets[0]));
        }
        // repair walls to limit
        else{
            const targets = room.find(FIND_STRUCTURES, {
            filter: object => (object.structureType == STRUCTURE_WALL && object.hits < wall_repair_limit) //object.hitsMax
            });
            
            targets.sort((a,b) => a.hits - b.hits);
                
            if(targets.length > 0) {
                towers.forEach(tower => tower.repair(targets[0]));
            }
        }
    },

    //defense has two mods: 1 - every tower attacks nearest enemy and 0 - all towers attack one random enemy
    defend: function defendRoom(room, mode) {
        var hostiles = room.find(FIND_HOSTILE_CREEPS);
        if (hostiles.length > 0) {
            var username = hostiles[0].owner.username;
            Game.notify(`User ${username} spotted in room ${room.name}`);
            var towers = room.find(
                FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
            
            if (mode) {
                towers.forEach(tower => tower.attack(tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS)));
            }
            else {
                towers.forEach(tower => tower.attack(hostiles[0]));
            }

        }
    }
};

module.exports = towers;