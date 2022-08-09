'use strict';

module.exports = {
  email: {
    type: 'string',
    trim: true,
    format: /^[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)+$/i,
    message: '邮箱格式有误',
  },
  password: {
    type: 'string',
    trim: true,
    format: /^[a-z0-9_-]{6,16}$/i,
    message: '密码至少6位字符',
  },
};
