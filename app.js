const express = require("express");
const application = express();

const bodyParser = require("body-parser");
const morgan = require("morgan");
const PORT = process.env.PORT || 3000;



/*
|--------------------------------------------------------------------------
|  Middleware
|--------------------------------------------------------------------------
*/
application.use(morgan("dev"));
application.use(bodyParser.json());

application.get("/", (request, response) => {
    response.json("You are visiting the main page of Instagram Clone V2");
});


application.listen(PORT, (request, response) => {
    response.json(`Server listening on PORT: ${PORT}`)
});