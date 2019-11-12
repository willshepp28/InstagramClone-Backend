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
        case "\"first_name\" is not allowed to be empty":
            return inputNullError("first name");
            break;
        case "\"last_name\" is not allowed to be empty":
            return inputNullError("last name")
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
        case "\"first_name\" length must be at least 3 characters long":
            return inputDoesntMeetMinimumRequirements("first name");
            break;
        case "\"last_name\" length must be at least 3 characters long":
            return inputDoesntMeetMinimumRequirements("last name");
            break;
        case "\"confirmPassword\" must be [ref:password]":
            return PasswordDoesntMatch;
            break;
    }
}


module.exports = {
    getValidationError
}