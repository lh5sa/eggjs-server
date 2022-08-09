'use strict';

module.exports = {
  desc: {
    type: 'string',
    allowEmpty: false,
    required: false,
    message: '权限描述不能为空',
  },
  type: {
    type: 'enum',
    convertType: 'int',
    values: [0, 1],
    required: false,
    message: '权限类型不能为空',
  },
  pid: {
    type: 'number',
    convertType: 'int',
    required: false,
    message: '父级权限ID不能为空',
  },
  status: {
    type: 'enum',
    convertType: 'int',
    values: [0, 1],
    required: false,
    message: '权限状态有误',
  },
};
