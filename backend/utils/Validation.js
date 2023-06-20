const Joi = require("joi")


module.exports.authValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required() 
})

module.exports.employeeValidationSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    nationalId: Joi.string().required().length(16),
    telephone: Joi.string().required().length(10),
    email: Joi.string().email().required(),
    department: Joi.string().required(),
    position: Joi.string().required(),
    laptopManufacturer: Joi.string().required(),
    laptopModel: Joi.string().required(),
    serialNumber: Joi.string().required()
})
