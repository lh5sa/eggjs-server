'use strict';

module.exports = {
  old_password: {
    type: 'string',
    trim: true,
    required: true,
    format: /^[a-z0-9_-]{6,16}$/i,
    message: '密码至少6位字符',
  },
  new_password: {
    type: 'string',
    trim: true,
    required: true,
    format: /^[a-z0-9_-]{6,16}$/i,
    message: '密码至少6位字符',
  },
};
