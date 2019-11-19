const GeneralService = require("../app/general_service");



const Authentication = function(application){

    const register = (state, callback) => {
        GeneralService.create(state, callback)
    }

    const login = (state, callback) => {
        GeneralService.findOne(state, callback)
    }

    return {
        register,
        login
    }
}

module.exports = Authentication;