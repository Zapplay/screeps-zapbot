var roleTowerRecharger = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.recharging && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.recharging = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.recharging && creep.store.getFreeCapacity() == 0) {
            creep.memory.recharging = true;
            creep.say('⚡ recharge');
        }

        if(creep.memory.recharging) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#48ff00'}});
                }
            }
        }
        else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ff00ea'}});
            }
        }
    }
};

module.exports = roleTowerRecharger;