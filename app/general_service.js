const _ = require("lodash");




const create = function(state, callback){

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