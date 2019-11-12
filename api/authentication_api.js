const router = require("express").Router();



router.get("/register", (request, response) => {
    const state = request.state;
    // const services = state.application.get("services");
    response.json("You are in the authentication route");
});


module.exports = router;