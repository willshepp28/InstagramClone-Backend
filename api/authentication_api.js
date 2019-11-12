const router = require("express").Router();
const Joi = require('@hapi/joi');
const { registerSchema, validateSchema } = require("../helpers/validators/register-validator");
const ResponseHelper = require("../app/response_handler");



router.get("/register", async (request, response) => {
    const state = request.state;
    const services = state.application.get("Services");

const {error, value} = await validateSchema("Bob", "Brown", "bob@gmail.com", "bob222", "ldffaefe", "ldffaefe");

  if(error){
      console.log(error);
      ResponseHelper.handleResponse(error)
      return;
  }
  
});


module.exports = router;