const Joi = require('joi');

module.exports = {

    //POST /api/v1/tasks/createThumbnail
    createThumbnail: {
        body: {
            imageUrl: Joi.string().required()
        }
    },

    // PATCH /api/v1/tasks/applyJson
    applyJson: {
        body: {
            source: Joi.object().required(),
            patch: Joi.alternatives().try(Joi.object(), Joi.array())
        }
    }
};
