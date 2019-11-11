
const create = function(state, callback){

}

const findById = function(state, callback){
    state.model.findOne().asCallback((error, data) => {
        if(error){
            return error;
        } else {
            state.obj = obj;
        }
    })
    callback()
};


const findOne = function(){

}


const query = function(){

}

const update = function(){
    state.model.update().asCallback(() => {
        
    })
}


return {
    create,
    findById,
    findOne,
    query,
    udpate
}