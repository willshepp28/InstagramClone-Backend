
class ErrorHandler extends Error{
    constructor(httpStatusCode, message){
        super();
        this.httpStatusCode = httpStatusCode;
        this.message  = message;
    }
}

const incorrectPassword = new ErrorHandler(400, "You entered an incorrect password")
const serverError = new ErrorHandler(500, "Internal Server Error");
const resouceNotFound = new ErrorHandler(404, "Resouce Not Found");
const sequelizeUniqueContrainstError = new ErrorHandler(400, "User already exists with those credientals try something else.")


const passwordDoesntMatch = () => {
    return new ErrorHandler(400, "Passwords Must Match");
}

const inputNullError = (input) => {
    return new ErrorHandler(400,  `You must enter your ${input}`);
};

const inputDoesntMeetMinimumRequirements = (input, minAmount) => {
    return new ErrorHandler(400, `Your ${input} must be at least ${minAmount} characters long`)
}

const inputExceedsMaximumRequirements = (input, maxAmount) => {
    return new ErrorHandler(400, `Your ${input} must be less than or equal to ${maxAmount} characters long`)
}



const getErrorDefinition = (error) => {
    switch(error.name) {
        case "Validation Error":
            return getValidationError(error)
            break;
        case "SequelizeDatabaseError":
            return new ErrorHandler(500, "Database Error");
            break;
        case "SequelizeUniqueConstraintError":
            return sequelizeUniqueContrainstError
            break;
        case "Resource Not Found":
            return resouceNotFound;
            break;
        case "Incorrect Password":
            return incorrectPassword;
            break;
    }
}


const getValidationError = (error) => {
    switch(error.message) {
        case "\"fullName\" length must be less than or equal to 40 characters long":
            return inputExceedsMaximumRequirements("Full name", 40);
            break;
        case "\"username\" length must be less than or equal to 10 characters long":
            return inputExceedsMaximumRequirements("username", 10);
            break;
        case "\"password\" length must be less than or equal to 20 characters long":
            return inputExceedsMaximumRequirements("password", 20);
            break;
        case "\"email\" must be a valid email":
            return new ErrorHandler(400, "Please use a valid email");
            break;
        case "\"email\" is required":
            return inputNullError("email")
            break;
        case "\"fullName\" is required":
            return inputNullError("Full name");
            break;
        case "\"username\" is required":
            return inputNullError("username");
            break;
        case "\"password\" is required":
            return inputNullError("password");
            break;
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
        case "\"fullName\" length must be at least 5 characters long":
            return inputDoesntMeetMinimumRequirements("Full name", 5);
            break;
        case "\"username\" length must be at least 3 characters long":
            return inputDoesntMeetMinimumRequirements("username", 3);
            break;
        case "\"password\" length must be at least 3 characters long":
            return inputDoesntMeetMinimumRequirements("password", 3);
            break;
        case "\"confirmPassword\" must be [ref:password]":
            return PasswordDoesntMatch;
            break;
    }
}





module.exports = {
    ErrorHandler,
    serverError,
    resouceNotFound,
    sequelizeUniqueContrainstError,
    incorrectPassword,
    getErrorDefinition,
    passwordDoesntMatch,
    inputNullError,
    inputDoesntMeetMinimumRequirements,
    inputExceedsMaximumRequirements
}