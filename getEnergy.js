var getEnergy = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const found = Game.flags.ESC1.pos.lookFor(LOOK_STRUCTURES);
        if(found.length) {
            if(creep.withdraw(found[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(found[0]);
            }
        }
    }
};

module.exports = getEnergy;