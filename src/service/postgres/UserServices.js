/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');

class UserService {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({ username, password: plainPassword, fullname }) {
    const id = `user-${nanoid(16)}`;
    const password = await bcrypt.hash(plainPassword, 10);

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4) returning id',
      values: [id, username, password, fullname],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('tidak dapat menambahkan user');
    }

    return result.rows.id;
  }
}

module.exports = UserService;
