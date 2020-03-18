const router = require("express").Router();
const async = require("async");
const { validateToken } = require("../helpers/jwt/verify-token")






router.get("/getPosts", validateToken, (request, response) => {
    const state = request.state;
    const services = state.application.get("Services");
    const user = request.decoded;



    /**
     *  Get all the posts of from the accounts that the user is following
     * 
     *  1. Should only be accounts the user is following
     *  2. Limit the results to 5 per query
     *  3. Post should include the amount of likes
     *  4. Posts should inlucd the amount of comments
     *  5. Posts should include date
     */

    const tasks = {
        GetPosts: async.apply(services.Post)
    };

   
   return response.json([
       {id: 1, user_id: 2, photo: "www.google.com", caption: "This is google"},
       {id: 3, user_id: 5, photo: "www.facebook.com", caption: "This is facebook"}
   ])
    
});

module.exports = router;