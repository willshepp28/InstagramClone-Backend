const express = require("express");
const application = express();

const bodyParser = require("body-parser");
const _ = require("lodash");
const StateManager = require("./app/state_manager")(application);
const StateHelper = require("./app/state_manager_helper");
const sequelize = require("./db/models/index");
const DataTypes = require('sequelize');
DataTypes.validator = require("validator");

const { ErrorHandler, HandleError } = require("./app/error_handler");
const GeneralService = require("./app/general_service");
const passport = require("passport");
const morgan = require("morgan")
const cors = require("cors");
const PORT = process.env.PORT || 4000;



/*
|--------------------------------------------------------------------------
|  Middleware
|--------------------------------------------------------------------------
*/

// process.on('uncaughtException', function(error) {
//     console.log('Unhandled Exception ', error, ' at time ', new Date());
//     console.log(error.stack);

//   });
//   process.on('unhandledRejection', function(reason, p) {
//     console.log('Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason, ' at time: ', new Date());
//     console.log(reason.stack);
//   });

application.use(StateManager.initialize);
application.use(morgan("dev"));
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ extended: false }));


application.use(passport.initialize())
// application.use(cors());

application.set('ORM', sequelize.sequelize);
application.set("DataTypes", DataTypes);
application.set("Models", _.omit(require("./db/models"), ["sequelize", "Sequelize"]));

var count = 0;


application.get('/favicon.ico', (request, response) => {
    response.status(204)
});

application.get("/:id", (request, response) => {
    const state = request.state;
    const UserState = StateHelper.cloneStateManager(state, "User", {
        queryParams: {
            id: parseInt(request.params.id)
        }
    });

    GeneralService.findById(UserState, function(err, results) {
        if(err){
            return response.status(404).json({message: error})
        }
        return response.status(200).json(results)
    })
   
});


// application.all('*',(err, request, response, next) => {
//     console.log("The error handler is called")
//     HandleError(err, response)
//     next();
// });

// application.use((error, request, response, next) => {
//     console.log("error")
//     response.json({ message: error.message})
// });

// application.use(function(error, request, response, next){
//     console.log("YOu have a error")
//     response.json(error)
//     // HandleError(error, response)
// })


application.listen(PORT, (request, response) => {
    console.log(`Server listening on PORT: ${PORT}`)
});