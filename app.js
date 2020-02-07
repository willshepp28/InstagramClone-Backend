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
// const PORT = process.env.PORT || 4000;
const fs = require("fs")





/*
|--------------------------------------------------------------------------
|  Middleware
|--------------------------------------------------------------------------
*/
// process.on("beforeExit", code => {
//     setTimeout(() => {
//         console.log(`Process will exit with the code: ${code} `);
//         console.log(process.env.DATABASE_URL || "This is not using the enviromen t varable")
//         process.exit(code);
//     }, 100)
// })

// process.on("uncaughtException", error => {
//     console.log(error);
//     console.log(process.env.DATABASE_URL)
//     process.exit(1);
// })

// process.on('unhandledRejection', error => {
//     console.error(error)
//     console.log(process.env.DATABASE_URL || "This is not using the enviromen t varable")
//     process.exit(1);
// });





application.use(StateManager.initialize);
application.use(morgan("combined"));
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ extended: false }));


application.use(cors());

application.set("privateKey", fs.readFileSync('./eprivate.key', 'utf8'));
application.set("publicKey", fs.readFileSync('./epublic.pem', 'utf8'));
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






// application.listen(PORT, (request, response) => {
//     console.log(`Server listening on PORT: ${PORT}`)
// });

application.listen(process.env.PORT || 8080, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, application.settings.env);
  });