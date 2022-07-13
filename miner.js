var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const sources = creep.pos.findClosestByRange(FIND_SOURCES);
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#48ff00'}});
        }
    }
};

module.exports = roleMiner;