const ErrorHandler = require("./error_handler");


const handleResponse = (error, state) => {
    if(error && !error.httpStatusCode || error.name) {
        error = ErrorHandler.serverError;
    }

    const statusCode = error ? error.httpStatusCode: 200;
    const data = error? error.message :state.obj;

    state.response.status(statusCode).json(data)
}


module.exports = {handleResponse};