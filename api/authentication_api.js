require('dotenv').config()

const router = require("express").Router();
const async = require("async");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const { validateSchema } = require("../helpers/validators/register-validator");
const { validateLoginSchema } = require("../helpers/validators/login-validator");
const { comparePasswordtoHash } = require("../helpers/encryption/encrypt");
const ResponseHelper = require("../app/response_handler");
const {cloneStateManager} = require("../app/state_manager_helper");
const {  getErrorDefinition } = require("../app/error_handler");



router.post("/register", (request, response) => {
  const state = request.state;
  const services = state.application.get("Services");
  const params = request.body;

  console.log("now logging all parameters")
  console.log(params);


  const tasks = {
    ValidateUserInput: async.apply(validateSchema, params.email, params.fullName, params.username, params.password),
    ifValidThenRegisterUser: ['ValidateUserInput',(results, callback) => {
      if(results.ValidateUserInput.error) { 
        callback({name: "Validation Error", message: results.ValidateUserInput.error.message})
        return;
      }
      services.Authentication.register(cloneStateManager(state, "User", {
        data: results.ValidateUserInput.value
      }), callback)
    }]
  }

  async.auto(tasks, (error, results) => {
    if(error){
      ResponseHelper.handleResponse(getErrorDefinition(error), state);
      return;
    }
    
    ResponseHelper.handleResponse(null, results.ifValidThenRegisterUser);
  })
})




router.post("/login", (request, response) => {
  const state = request.state;
  const services = state.application.get("Services");
  const params = request.body;

  const tasks = {
    // Always Begin With Initalizing State
    InitializeUserState: (callback) => {
      const UserState = cloneStateManager(state, "User");
      callback(null, UserState)
    },
    ValidateUserInput: async.apply(validateLoginSchema, params.email, params.password),
    IfValidFindUser: ['ValidateUserInput', 'InitializeUserState', (results, callback) => {
      if(results.ValidateUserInput.error) { 
        callback({name: "Validation Error", message: results.ValidateUserInput.error.message})
        return;
      }

      results.InitializeUserState.where = { email: results.ValidateUserInput.value.email}
      results.InitializeUserState.attributes.push(["id", "email", "username", "profile_pic", "password"]);
      services.Authentication.login(results.InitializeUserState, callback);
    }],
    IfUserExistsThenComparePasswordToHash: ['IfValidFindUser', (results, callback) => {
      const user = results.IfValidFindUser.obj;

      if(!user){
        callback({ name: "Resource Not Found"})
        return;
      }
      comparePasswordtoHash(params.password, user.password).then((data) => {
          if(!data){ callback({name: "Incorrect Password"})}

          results.InitializeUserState.obj.token = jwt.sign(_.omit(user, ['password', 'createdAt', 'updatedAt']), state.application.get('privateKey'), { algorithm: 'RS256'})
          delete results.InitializeUserState.obj.password;
          callback(null);
      })
    }]
  }


  async.auto(tasks, (error, results) => {
    if(error){
      ResponseHelper.handleResponse(getErrorDefinition(error), state);
      return;
    }
    
    // Always end by passing state
    ResponseHelper.handleResponse(null, results.InitializeUserState);
  })
})






module.exports = router;