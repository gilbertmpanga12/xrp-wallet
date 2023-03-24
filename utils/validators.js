const Joi = require('joi');

const Transaction = Joi.object({
    amount: Joi.string().required(),
    address: Joi.string().required()
});


module.exports = {Transaction};