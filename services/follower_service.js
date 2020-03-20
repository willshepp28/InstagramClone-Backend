const GeneralService = require("../app/general_service");
const { cloneStateManager } = require("../app/state_manager_helper");

const Follower = function(){

    const GetAllIdsOfAccountsUserIsFollowing = (state, id, callback) => {
        GeneralService.findAll(cloneStateManager(state, "Follower", {
            where: {
                follower_id: id 
            }
        }
        ),callback);
    }; 


    return {
        GetAllIdsOfAccountsUserIsFollowing
    }
}


module.exports = Follower;