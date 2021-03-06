var roleOperator = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var getEnergy = require('operation.getEnergy');
        if(creep.store.getFreeCapacity() == 0) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) &&
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
            getEnergy.run(creep);
        }
    }
};

module.exports = roleOperator;