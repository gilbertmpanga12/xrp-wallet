const Joi = require('joi');

const Transaction = Joi.object({
    amount: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
    message: Joi.string().required()
});


module.exports = {Transaction};