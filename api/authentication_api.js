const router = require("express").Router();



router.get("/register", (request, response) => {
    const state = request.state;
    const services = state.application.get("Services");
 
    response.json(services.User.findById());
});


module.exports = router;