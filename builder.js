var roleBuilder = {

    

    /** @param {Creep} creep **/
    run: function(creep) {

        var getEnergy = require('operation.getEnergy');

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            // build
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#4fcaff'}});
                }
            }
            // repair any damaged structures to 5000 hits and repair containers to max hits
            else{
                const targets = creep.room.find(FIND_STRUCTURES, {
                    filter: object => (object.hits < object.hitsMax && object.hits < 5000) || (object.structureType == STRUCTURE_CONTAINER && object.hits < object.hitsMax)
                });
                
                targets.sort((a,b) => a.hits - b.hits);
                
                if(targets.length > 0) {
                    if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#4fcaff'}});
                    }
                }
                // repair walls to infinity
                else{
                    const targets = creep.room.find(FIND_STRUCTURES, {
                    filter: object => (object.structureType == STRUCTURE_WALL && object.hits < object.hitsMax)
                    });
                
                    targets.sort((a,b) => a.hits - b.hits);
                    
                    if(targets.length > 0) {
                        if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#4fcaff'}});
                        }
                    }
                }
            }
        }
        // harvest
        else {
            getEnergy.run(creep);
        }
    }
};

module.exports = roleBuilder;