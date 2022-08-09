'use strict';

module.exports = {
  username: {
    type: 'string',
    trim: true,
    required: true,
    max: 16,
    format: /^[_0-9a-z\u4e00-\u9fa5]{1,16}$/i,
    message: '用户名格式有误',
  },
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
