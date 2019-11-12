const router = require("express").Router();
const async = require("async");
const { registerSchema, validateSchema } = require("../helpers/validators/register-validator");
const ResponseHelper = require("../app/response_handler");
const {cloneStateManager} = require("../app/state_manager_helper");
const { getValidationError } = require("../helpers/validators/validator_error_handler")


/**
 * SIGNUP NEW USER
 * 
 * 1. Validate user input
 * 2. 
 */

router.get("/register", (request, response) => {
  const state = request.state;
  const services = state.application.get("Services");

  const tasks = {
    ValidateUserInput: async.apply(validateSchema, "iwi", "Bdfdsfae", "bob@gmail.com", "bob222", "theworld", "theworld"),
    ifValidThenRegisterUser: ['ValidateUserInput',(results, callback) => {
      if(results.ValidateUserInput.error) { 
        callback(true)
        return;
      }
      services.Authentication.register(cloneStateManager(state, "User", {
        data: results.ValidateUserInput.value
      }), callback)
    }]
  }

  async.auto(tasks, (error, results) => {
    if(error){
      ResponseHelper.handleResponse(getValidationError(results.ValidateUserInput.error), state);
      return;
    }
    ResponseHelper.handleResponse(null, results.ifValidThenRegisterUser);
  })
})







module.exports = router;