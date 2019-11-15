const { ErrorHandler } = require("../../app/error_handler");


const PasswordDoesntMatch = new ErrorHandler(400, "Passwords Must Match");

const inputNullError = (input) => {
    return new ErrorHandler(400,  `You must enter your ${input}`);
};

const inputDoesntMeetMinimumRequirements = (input) => {
    return new ErrorHandler(400, `Your ${input} must be at least 3 characters long`)
}

const getValidationError = (error) => {
    switch(error.message) {
        case "\"fullName\" is not allowed to be empty":
            return inputNullError("Full name");
            break;
        case "\"email\" is not allowed to be empty":
            return inputNullError("email")
            break;
        case "\"username\" is not allowed to be empty":
            return inputNullError("username");
            break;
        case "\"password\" is not allowed to be empty":
            return inputNullError("password");
            break;
        case "\"confirmPassword\" s not allowed to be empty":
            return inputNullError("password confirmation");
            break;
        case "\"fullName\" length must be at least 3 characters long":
            return inputDoesntMeetMinimumRequirements("Full name");
            break;
        case "\"confirmPassword\" must be [ref:password]":
            return PasswordDoesntMatch;
            break;
    }
}


module.exports = {
    getValidationError
}