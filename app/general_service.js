const _ = require("lodash");



// We use the model located on the state object, then create a with the values placed on the state.data object
const create = function(state, callback){
    state.model.create(state.data).then((data) => {
        state.obj = data.dataValues;
        callback(null, state)
    }).catch(error => {
        callback(error)
    });
}


const findById = function(state, callback){
    const where = _.merge(state.queryParams, state.where);
    state.model.findOne({where}).then((data) => {
        state.obj = data.dataValues;
        callback(null, state);
    })
    .catch((error) =>{
        callback(error);
    })
};


const findOne = function(){

}


const query = function(){

}

const update = function(){
    state.model.update().asCallback(() => {

    })
}


module.exports = {
    create,
    findById,
    findOne,
    query,
    update
}