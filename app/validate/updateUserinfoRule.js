'use strict';

module.exports = {
  username: {
    type: 'string',
    trim: true,
    required: false,
    max: 16,
    format: /^[_0-9a-z\u4e00-\u9fa5]{2,16}$/i,
    message: '用户名格式有误',
  },
  email: {
    type: 'string',
    required: false,
    trim: true,
    format: /^[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)+$/i,
    message: '邮箱格式有误',
  },
  avatar: {
    type: 'string',
    required: false,
    allowEmpty: false,
    format: /^(https?:\/\/)([a-z0-9]+\.?)+(\:\d+)?[a-z0-9:\/~.&$]*$/i,
    message: '头像地址有误',
  },
  status: {
    type: 'enum',
    required: false,
    values: [0, 1],
    message: '状态值有误',
  },
  password: {
    type: 'string',
    required: false,
    trim: true,
    format: /^[a-z0-9_-]{6,16}$/i,
    message: '密码至少6位字符',
  },
};
