const Joi = require('@hapi/joi');

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    fullName: Joi.string().min(5).max(40).required(),
    username: Joi.string().min(3).max(10).required(),
    password: Joi.string().min(3).max(20).required(),
})


const validateSchema = async (email, fullName, username, password, callback) => {
    console.log(email);
    const {error, value} = registerSchema.validate({
        email: email,
        fullName: fullName,
        username: username,
        password: password
    });

    callback(null, {error, value})
};

module.exports = {registerSchema, validateSchema};