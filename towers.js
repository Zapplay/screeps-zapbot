var towers = {
    run: function (tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if (closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
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