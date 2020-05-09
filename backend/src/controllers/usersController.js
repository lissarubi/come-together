const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
  async index(request, response) {
    const users = await connection('users').select('*');
    return response.json(users);
  },

  async create(request, response) {
    const { name, apps } = request.body;

    const id = crypto.randomBytes(8).toString('HEX');

    await connection('users').insert({
      id,
      name,
      password,
      apps,
    });

    return response.json({ id });
  },

  async change(request, response) {
    const { username, password, apps } = request.body;
    try {
      await connection('users')
        .where({
          username: username,
          password: password,
        })
        .update({ apps: apps });
      return response.status(204).send();
    } catch (err) {
      console.log(err);
    }
  },
};
