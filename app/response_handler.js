const ErrorHandler = require("./error_handler");


const handleResponse = (error, state) => {
    if(error && !error.httpStatusCode) {
        error = ErrorHandler.serverError;
    }

    const statusCode = error ? error.statusCode: 200;
    const data = error? error.message :state.obj;

    state.response.status(statusCode).json({message: data})
}


module.exports = {handleResponse};