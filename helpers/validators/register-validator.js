const Joi = require('@hapi/joi');

const registerSchema = Joi.object({
    first_name: Joi.string().min(3).max(10).required(),
    last_name: Joi.string().min(3).max(15).required(),
    email: Joi.string().email().required(),
    username: Joi.string().min(3).max(10).required(),
    password: Joi.string().regex(/^[\w]{8,30}$/),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().strict()
})


const validateSchema = async (firstName, lastName, email, username, password, confirmPassword, callback) => {
    const {error, value} = registerSchema.validate({
        first_name: firstName,
        last_name: lastName,
        email: email,
        username: username,
        password: password,
        confirmPassword: confirmPassword
    });

    callback(null, {error, value})

}

module.exports = {registerSchema, validateSchema};