// const resouceDoesNotExist = 
class ErrorHandler extends Error{
    constructor(statusCode, message){
        super();
        this.statusCode = statusCode;
        this.message  = message;
    }
}


const HandleError = (error, response) => {
    const { statusCode, message } = error;
    response.json("YOU have no user")
}


const serverError = new ErrorHandler(500, "Internal Server Error");
const resouceNotFound = new ErrorHandler(404, "Resouce Not Found");

module.exports = {
    ErrorHandler,
    HandleError,
    serverError,
    resouceNotFound
}