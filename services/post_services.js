const GeneralService = require("../app/general_service");

const Post = function(){

    const findById = (state, callback) => {
        GeneralService.findById(state,callback);
    }; 

    const getAll = (state, callback) => {
        
    }


    return {
        findById,
        getAll
    }
}


module.exports = Post;