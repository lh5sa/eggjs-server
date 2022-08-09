'use strict';

module.exports = {
  desc: {
    type: 'string',
    allowEmpty: false,
    message: '权限描述不能为空',
  },
  type: {
    type: 'enum',
    convertType: 'int',
    values: [0, 1],
    required: true,
    message: '权限类型不能为空',
  },
  pid: {
    type: 'number',
    convertType: 'int',
    required: true,
    message: '父级权限ID不能为空',
  },
};
