require('dotenv').config()

const express = require("express");
const application = express();

const bodyParser = require("body-parser");
const _ = require("lodash");
const StateManager = require("./app/state_manager")(application);
const sequelize = require("./db/models/index");
const DataTypes = require('sequelize');
DataTypes.validator = require("validator");

const authenticationAPI = require("./api/authentication_api");
const friendsAPI = require("./api/friends_api");
const { validateToken } = require("./helpers/jwt/verify-token");
const morgan = require("morgan")
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const fs = require("fs")



/*
|--------------------------------------------------------------------------
|  Middleware
|--------------------------------------------------------------------------
*/

process.on('unhandledRejection', error => {
    console.log(error)
});


application.use(StateManager.initialize);
application.use(morgan("dev"));
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ extended: false }));


application.use(cors());

application.set("privateKey", fs.readFileSync('./eprivate.key', 'utf8'));
application.set("publicKey", fs.readFileSync('./epublic.key', 'utf8'));
application.set('ORM', sequelize.sequelize);
application.set("DataTypes", DataTypes);
application.set("Models", _.omit(require("./db/models"), ["sequelize", "Sequelize"]));
application.set("Services", require("./app/service_bundler")(application));



application.get('/favicon.ico', (request, response) => {
    response.status(204)
});




/*
|--------------------------------------------------------------------------
|  API
|--------------------------------------------------------------------------
*/
application.use("/api/authenticate", authenticationAPI);

application.use("/api/friends", friendsAPI);






application.listen(PORT, (request, response) => {
    console.log(`Server listening on PORT: ${PORT}`)
});