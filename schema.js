

const Joi = require('joi');

const listingSchema = Joi.object({
    List: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().min(0).required(),
        image: Joi.string().allow("", null),
        location: Joi.string().required(),
        country: Joi.string().required(),
    }).required()
});

const reviewSchema = Joi.object({
    Review: Joi.object({
        comment: Joi.string().required(),
        rating: Joi.number().min(1).max(5).required(),
    }).required()
});

module.exports = {
    listingSchema,
    reviewSchema
};
