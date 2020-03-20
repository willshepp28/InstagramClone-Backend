const _ = require("lodash");


const getQueryFilters = (state) => {
    return {
        includes: state.includes,
        where: state.where,
        order: state.order
    }
}

// We use the model located on the state object, then create a with the values placed on the state.data object
const create = function(state, callback){

    state.model.create(state.data).then((data) => {
        state.obj = { status: "OK"};
         return callback(null, state)
    }).catch(error => {
        return callback(error)
    });
}


const findAll = function(state, callback) {
    let filters = getQueryFilters(state);

    state.model.findAll(filters).then((data) => {
        state.obj = data
        return callback(null, state)
    })
    .catch((error) => {
        return callback(error);
    })
}


const findById = function(state, callback){
    const where = _.merge(state.queryParams, state.where);
    state.model.findOne({where}).then((data) => {
        state.obj = data.dataValues;
        return callback(null, state);
    })
    .catch((error) =>{
        return callback(error);
    })
};


const findOne = function(state, callback){

    const options = {
        where:  state.where,
        attributes: state.attributes[0],
        raw: true
    }

    state.model.findOne(options).then((data) => {
        state.obj = data;
        return callback(null, state)
    })
    .catch((error) => {
        return callback(error)
    })
}


const query = function(){

}

const update = function(){
    state.model.update().asCallback(() => {

    })
}


module.exports = {
    create,
    findAll,
    findById,
    findOne,
    query,
    update
}