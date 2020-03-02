const router = require("express").Router();
const async = require("async");






router.get("/getPosts", (request, response) => {
   return response.json([
       {id: 1, user_id: 2, photo: "www.google.com", caption: "This is google"},
       {id: 3, user_id: 5, photo: "www.facebook.com", caption: "This is facebook"}
   ])
    
})

module.exports = router;