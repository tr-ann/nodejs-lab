import Joi from 'joi';

let validationSchemes = {

  CreatePost: Joi.object({
    body: {
      description: Joi
        .string()
        .required(),
      image: Joi
        .string()
        .max(255),
      tags: Joi
        .array()
        .items(
          Joi
            .string()
            .max(255)
            .required()
        )
    }
  })

}

export default validationSchemes;