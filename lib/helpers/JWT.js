require('dotenv/config');

const jwt = require('jsonwebtoken');

module.exports = class JWT {
  static verify(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  static create(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '15m',
    });
  }
};
