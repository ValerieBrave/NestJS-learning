import * as Joi from 'joi';

export const postSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    birthday: Joi.date().required().max('now')   //mm/dd/yyyy
})
