// const resouceDoesNotExist = 
class ErrorHandler extends Error{
    constructor(httpStatusCode, message){
        super();
        this.httpStatusCode = httpStatusCode;
        this.message  = message;
    }
}




const serverError = new ErrorHandler(500, "Internal Server Error");
const resouceNotFound = new ErrorHandler(404, "Resouce Not Found");


module.exports = {
    ErrorHandler,
    serverError,
    resouceNotFound
}