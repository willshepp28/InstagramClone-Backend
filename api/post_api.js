const router = require("express").Router();
const async = require("async");






router.get("/", (request, response) => {
    const state = request.state;
    const services = state.application.get("services");
    
})

module.exports = router;