const express = require("express");
const application = express();

const bodyParser = require("body-parser");
const State = require("./app/state")(application);
const sequelize = require("./db/models/index");
const DataTypes = require('sequelize');
DataTypes.validator = require("validator");

const passport = require("passport");
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 4000;



/*
|--------------------------------------------------------------------------
|  Middleware
|--------------------------------------------------------------------------
*/

application.use(State.initialize);
application.use(morgan("dev"));
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ extended: false }));


application.use(passport.initialize())
application.use(cors());

application.set('ORM', sequelize.sequelize);
application.set("DataTypes", DataTypes);
application.set("Models", require("./db/config/model_initializer")(application));

// application.set('dataTypes', dataTypes);

application.get("/", (request, response) => {
    const ORM = request.state.application.get("ORM");
    response.json("Sequelize")
});


application.listen(PORT, (request, response) => {
    console.log(`Server listening on PORT: ${PORT}`)
});