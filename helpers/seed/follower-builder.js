




/**
 * 
 * Assign 6 followers for each users
 * 
 * 
 * 1. Figure out how many users are in the database
 * 2. Using Pagination each user should be assigned 5 users,
 *  EXAMPLE: user 1 should be assigned user 2 through 5
 * 
 * 
 * 
 * CAVEAT
 * - users should not follow themselves
 * 
 * 
 * DATA MODEL
     id               | integer                  |           | not null | nextval('"Followers_id_seq"'::regclass)
    user_id          | integer                  |           | not null | 
    follower_id      | integer                  |           | not null | 
    request_accepted | boolean                  |           | not null | 
    createdAt        | timestamp with time zone |           | not null | 
    updatedAt   


 */

const _state = {
    offset: 1,
    limit: 5,
    totalUsersInDB: 0,
    followers: [],
    GetFollowerPagination: function() {
        return this.offset + this.limit;
    },
    resetOffset: function() {
        this.offset = 1;
    },
    addNewFollower: function(user_id, follower_id) {
        this.followers.push({ user_id: user_id, follower_id: follower_id, request_accepted: true, createdAt: new Date(), updatedAt: new Date()})
    },
    checkIfFollowerIdValid: function(id) {
        if(id > this.totalUsersInDB) {
            return false;
        } else {
            return true;
        }
    }
}




    /**
     * This function essentially loops over each user in the database and adds 6 followers to each account
     * 
     * Used for intial seeding purposes only
     */
async function createFollowers(totalUsersInDB){


   _state.totalUsersInDB = totalUsersInDB;
   let newOffset;


   for(let user_id = 1; user_id <= _state.totalUsersInDB; user_id++) {
    for(var follower_id = _state.offset; follower_id <= _state.GetFollowerPagination(); follower_id++) {

        // If the follower_id is going over the total number of users in the database then we need to reset the offset and user_id, so that users are assigned follower_ids that dont exist
        if(!_state.checkIfFollowerIdValid(follower_id)) {
            _state.resetOffset()
            follower_id = 1;
        }
       

        // make sure that users wont be allowed to follow themselves
        if(user_id !== follower_id) {
            _state.addNewFollower(user_id, follower_id)
        }
        
        // if follower_id is equal to our offset plus limit
        if(follower_id === _state.GetFollowerPagination()) {
             newOffset = follower_id;
        }
       
    }
 
        _state.offset = newOffset;
    
   }

   return _state.followers;

};




module.exports = createFollowers;