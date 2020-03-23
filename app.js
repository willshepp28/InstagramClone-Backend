require('dotenv').config()


const express = require("express");
const application = express();

const bodyParser = require("body-parser");
const _ = require("lodash");
const StateManager = require("./app/state_manager")(application);

const authAPI = require("./api/auth.api");
const authenticationAPI = require("./api/authentication_api");
const friendsAPI = require("./api/friends_api");
const postAPI = require("./api/post_api");
const morgan = require("morgan")
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const fs = require("fs")






/*
|--------------------------------------------------------------------------
|  Middleware
|--------------------------------------------------------------------------
*/

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
    process.exit(1);
});





// application.use(StateManager.initialize);
application.use(morgan("combined"));

application.use(bodyParser.urlencoded());
application.use(bodyParser.json());


application.use(cors());

if(process.env.NODE_ENV === 'production') {
    application.set("privateKey", process.env.privateKey);
    application.set("publicKey", process.env.publicKey);
} else {
    application.set("privateKey", fs.readFileSync('./eprivate.key', 'utf8') || process.env.privateKey);
    application.set("publicKey", fs.readFileSync('./epublic.pem', 'utf8') || process.env.publicKey);
}

// application.set('ORM', sequelize.sequelize);
// application.set("DataTypes", DataTypes);
// application.set("Models", _.omit(require("./db/models/index"), ["sequelize", "Sequelize"]));
// application.set("Services", require("./app/service_bundler")(application));



application.get("/", (request, response) => {
    return response.send("You are in the instagram clone api")
})

application.get('/favicon.ico', (request, response) => {
    response.status(204)
});




/*
|--------------------------------------------------------------------------
|  API
|--------------------------------------------------------------------------
*/

application.use("/api/authenticate", authAPI);
application.use("/api/authenticate", authenticationAPI);

application.use("/api/friends", friendsAPI);

application.use("/api/posts", postAPI);





/*
|--------------------------------------------------------------------------
|  START SERVER
|--------------------------------------------------------------------------
*/
 //models.sequelize.sync().then(function() {
    application.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    });
 // });
