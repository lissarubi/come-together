const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const usersController = require('./controllers/usersController');

const routes = express.Router();

routes.get('/users', usersController.index);

routes.post(
  '/users',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      apps: Joi.string(),
    }),
  }),
  usersController.create,
);

routes.put(
  '/users',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
      apps: Joi.string(),
    }),
  }),
  usersController.change,
);

module.exports = routes;
