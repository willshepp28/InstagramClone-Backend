const Joi = require('@hapi/joi');

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    fullName: Joi.string().min(5).max(40).required(),
    username: Joi.string().min(3).max(10).required(),
    password: Joi.string().regex(/^[\w]{8,30}$/),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().strict()
})


const validateSchema = async (email, fullName, username, password, confirmPassword, callback) => {
    const {error, value} = registerSchema.validate({
        email: email,
        fullName: fullName,
        username: username,
        password: password,
        confirmPassword: confirmPassword
    });

    callback(null, {error, value})
};

module.exports = {registerSchema, validateSchema};