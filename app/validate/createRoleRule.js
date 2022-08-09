'use strict';

module.exports = {
  role_name: {
    type: 'string',
    allowEmpty: false,
    trim: true,
    message: '角色名称不能为空',
  },
  role_desc: {
    type: 'string',
    allowEmpty: false,
    trim: true,
    message: '角色描述不能为空',
  },
};
