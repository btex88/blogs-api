const validator = require('validator');
const _ = require('lodash');
const Messages = require('../helpers/Messages');
const JWT = require('../helpers/JWT');

module.exports = class Middlewares {
  static email(emailArg = '') {
    return validator.isEmail(emailArg);
  }

  static name(nameArg = '') {
    return nameArg.length >= 8;
  }

  static categoryName(nameArg = '') {
    return nameArg.length >= 2;
  }

  static password(passwordArg = '') {
    return passwordArg.length === 6;
  }

  static addUserValues(nameArg, emailArg, passwordArg) {
    const valuesArr = [
      this.name(nameArg),
      this.email(emailArg),
      this.password(passwordArg),
    ];
    return valuesArr.every((value) => value);
  }

  static title(titleArg = '') {
    return titleArg.length >= 2;
  }

  static content(contentArg = '') {
    return contentArg.length >= 3;
  }

  static categoryIds(categoryIdsArg = '') {
    return _.isEmpty(categoryIdsArg) === false;
  }

  static addPostValues(titleArg, contentArg, categoryIdsArg) {
    const valuesArr = [
      this.title(titleArg),
      this.content(contentArg),
      this.categoryIds(categoryIdsArg),
    ];
    return valuesArr.every((value) => value);
  }

  static validateAddPost(body) {
    const { title, content, categoryIds } = body;
    if (!this.title(title)) {
      return Messages.addPost().emptyTitle;
    }
    if (!this.content(content)) {
      return Messages.addPost().emptyContent;
    }
    if (!this.categoryIds(categoryIds)) {
      return Messages.addPost().emptyCategoryIds;
    }
    return Messages.teapot();
  }

  static validateAddUser(body) {
    const { email, password, displayName } = body;
    if (!this.name(displayName)) {
      return this.addUserNameMsg(displayName);
    }
    if (!this.email(email)) {
      return this.addUserEmailMsg(email);
    }
    if (!this.password(password)) {
      return this.addUserPasswordMsg(password);
    }
    return Messages.teapot();
  }

  static validateLoginUser(body) {
    const { email, password } = body;
    if (!this.email(email)) {
      return this.loginUserEmailMsg('email', body);
    }
    if (!this.password(password)) {
      return this.loginUserPasswordMsg('password', body);
    }
    return Messages.teapot();
  }

  static validateAddCategory() {
    return Messages.addCategory().name;
  }

  static loginUserValues(emailArg = '', passwordArg = '') {
    return this.email(emailArg) && this.password(passwordArg);
  }

  static propertyExists(propertyName, body) {
    return _.has(body, propertyName);
  }

  static addUserEmailMsg(emailArg = '') {
    return emailArg ? Messages.addUser().email : Messages.addUser().emptyEmail;
  }

  static addUserNameMsg(nameValue = '') {
    return nameValue.length ? Messages.addUser().name : Messages.teapot();
  }

  static addUserPasswordMsg(passwordArg = '') {
    return passwordArg.length
      ? Messages.addUser().password
      : Messages.addUser().emptyPassword;
  }

  static loginUserEmailMsg(propertyName, body) {
    return this.propertyExists(propertyName, body)
      ? Messages.loginUser().emptyEmail
      : Messages.loginUser().nullEmail;
  }

  static loginUserPasswordMsg(propertyName, body) {
    return this.propertyExists(propertyName, body)
      ? Messages.loginUser().emptyPassword
      : Messages.loginUser().nullPassword;
  }

  static tokenMsg(token = '') {
    return token.length
      ? Messages.token().invalid
      : Messages.token().inexistent;
  }

  static async authenticateToken(token) {
    try {
      const verifiedToken = await JWT.verify(token);
      return verifiedToken;
    } catch (_err) {
      return false;
    }
  }
};
