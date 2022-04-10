module.exports = class Messages {
  static addUser() {
    return {
      name: {
        status: 400,
        data: { message: '"displayName" length must be at least 8 characters long' },
      },
      email: { status: 400, data: { message: '"email" must be a valid email' } },
      emptyEmail: { status: 400, data: { message: '"email" is required' } },
      password: {
        status: 400,
        data: { message: '"password" length must be 6 characters long' },
      },
      emptyPassword: { status: 400, data: { message: '"password" is required' } },
    };
  }

  static loginUser() {
    return {
      nullEmail: { status: 400, data: { message: '"email" is required' } },
      emptyEmail: {
        status: 400,
        data: { message: '"email" is not allowed to be empty' },
      },
      nullPassword: {
        status: 400,
        data: { message: '"password" is required' },
      },
      emptyPassword: {
        status: 400,
        data: { message: '"password" is not allowed to be empty' },
      },
      invalidFields: { status: 400, data: { message: 'Invalid fields' } },
    };
  }

  static addCategory() {
    return {
      name: {
        status: 400,
        data: { message: '"name" is required' },
      },
      registered: {
        status: 409,
        data: { message: 'Category already registered' },
      },
    };
  }

  static addPost() {
    return {
      emptyTitle: {
        status: 400,
        data: { message: '"title" is required' },
      },
      emptyContent: {
        status: 400,
        data: { message: '"content" is required' },
      },
      emptyCategoryIds: {
        status: 400,
        data: { message: '"categoryIds" is required' },
      },
      inexistentCategoryIds: {
        status: 400,
        data: { message: '"categoryIds" not found' },
      },
    };
  }

  static user() {
    return {
      registered: {
        status: 409,
        data: { message: 'User already registered' },
      },
      inexistent: {
        status: 404,
        data: { message: 'User does not exist' },
      },
    };
  }

  static token() {
    return {
      invalid: {
        status: 401,
        data: { message: 'Expired or invalid token' },
      },
      inexistent: {
        status: 401,
        data: { message: 'Token not found' },
      },
    };
  }

  static teapot(err = null) {
    return {
      status: 418,
      data: {
        message: 'I cannot make coffee, cause I\'m a TEApot',
        errMessage: err
          ? err.message
          : 'An error ocurred, check your code syntax',
      },
    };
  }

  static ok(arg) {
    return {
      status: 200,
      data: arg,
    };
  }

  static success(arg) {
    return {
      status: 201,
      data: arg,
    };
  }
};
