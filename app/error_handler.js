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
    // response.status(statusCode).json({ status: "error", statusCode, message});
    response.json("YOU have no user")
}

module.exports = {
    ErrorHandler,
    HandleError
}