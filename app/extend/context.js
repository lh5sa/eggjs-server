'use strict';
module.exports = {
  // 成功的响应
  success(data = null, code = 200, msg = '') {
    msg = msg || this.helper.errorCode[code] || '成功';
    this.status = code;
    this.body = {
      success: true,
      code,
      msg,
      data,
    };
  },

  // 失败的响应
  error(code = 500, msg = '', data = null) {
    msg = msg || this.helper.errorCode[code] || '失败';
    this.status = code;
    this.body = {
      success: false,
      code,
      msg,
      data,
    };
  },
};
