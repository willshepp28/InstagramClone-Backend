const _ = require("lodash");




const create = function(state, callback){

}

// const findById = function(state, callback){
//     const where = _.merge(state.queryParams, state.where);
//     state.model.findOne({where}).then((results) => {
//         callback(null, results.dataValues)
//     })
//     .catch(error => {throw new Error(error)})
// };


const findById = function(state, callback){
    const where = _.merge(state.queryParams, state.where);
    state.model.findOne({where}).then((data) => {
        callback(null, data);
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