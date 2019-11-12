const GeneralService = require("../app/general_service");

const Authentication = function(application){

    const register = (state, callback) => {
        GeneralService.create(state, callback)
    }

    return {
        register
    }
}

module.exports = Authentication;