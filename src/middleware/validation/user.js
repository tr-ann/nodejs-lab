import Joi from 'joi';

let validationSchemes = {

  Registration: Joi.object({
    body: {
      login: Joi
        .string()
        .min(11)
        .max(100)
        .email()
        .required(),
      firstName: Joi
        .string()
        .max(100)
        .required(),
      lastName: Joi
        .string()
        .max(100)
        .required(),
      password: Joi
        .string()
        .min(8)
        .max(100)
        .required(),
      confirmedPassword: Joi
        .string()
        .min(8)
        .max(100)
        .valid(Joi.ref('password'))
        .required()
    }
  }),

  UpdateUser: {
    params: {
      id: Joi
        .number()
        .required()
    },
    body: {
      login: Joi
        .string()
        .min(16)
        .max(100)
        .email()
        .required(),
      firstName: Joi
        .string()
        .max(100)
        .required(),
      lastName: Joi
        .string()
        .max(100)
        .required()
    }
  },

  GetUserPosts: {
    params: {
      login: Joi
        .string()
        .min(6)
        .max(100)
    }
  },

  CheckId: {
    params: {
      id: Joi
        .number()
        .required()
    }
  }

};

export default validationSchemes;