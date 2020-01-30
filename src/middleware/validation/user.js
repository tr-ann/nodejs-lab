import Joi from 'joi';

let v = {

  Registration: Joi.object({
    body: {
      login: Joi
        .string()
        .min(6)
        .max(100)
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
        .ref('password')
    }
  })
  .with('password', 'confirmedPassword'),

  UpdateUser: {
    params: {
      id: Joi
        .number()
        .required()
    },
    body: {
      login: Joi
        .string()
        .min(6)
        .max(100)
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

  GetUsersList: Joi.object({
    query: {
      page: Joi
        .number(),
      role: Joi
        .string()
        .max(100)
    }
  }),

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

export default v;