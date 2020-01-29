const router = require("express").Router();
const { validateToken } = require("../helpers/jwt/verify-token");


/* 
    1. We need a route that shows post of the friends we follow
    2. We need a route that shows friends profile weither we follow or not
    3. We need a route  to show friend to potentially follow in the explore page
    4. We need a route to show all posts in the explore page

*/

router.get("/discover",  (request, response) => {
    return response.status(200).json({
        message: "You have access to this restricted route"
    })
});

router.get("/undiscover", (request, response) => {
    return response.status(200).json({
        message: "You have undiscovered friends"
    })
});

router.get("/unfriend", (request, response) => {
    return response.status(200).json({
        message: "You are unfriended bro"
    })
})
// router.get("/discover", validateToken,  (request, response) => {
//     return response.status(200).json({
//         message: "You have access to this restricted route"
//     })
// });


module.exports = router;


