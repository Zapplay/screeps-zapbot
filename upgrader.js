var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var getEnergy = require('operation.getEnergy');

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            // if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ff00ea'}});
            // }
            const upgradeSpotPos = Game.flags.UPG1.pos;
            if(JSON.stringify(creep.pos) != JSON.stringify(upgradeSpotPos)) {
                creep.moveTo(upgradeSpotPos);
            }
            else{
                creep.upgradeController(creep.room.controller);
            }
        }
        else {
            getEnergy.run(creep);
        }
    }
};

module.exports = roleUpgrader;