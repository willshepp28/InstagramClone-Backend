const Joi = require('@hapi/joi');

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(20).required(),
})


const validateLoginSchema = async (email, password, callback) => {
    const {error, value} = loginSchema.validate({
        email: email,
        password: password
    });

    callback(null, {error, value})
};

module.exports = {loginSchema, validateLoginSchema};