const Joi = require("joi");

const kidschema = Joi.object({
	id: Joi.number().min(0).required()
});

module.exports = (data) => {
	return kidschema.validate(data);
};
