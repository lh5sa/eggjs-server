'use strict';

module.exports = {
  // 代码异常时, 执行这个处理函数, 其他函数不会生效
  // all(){}

  // 当请求头中没有: Accept: application/json 时执行
  html(e, ctx) {
    ctx.body = `<h1>服务端报错了...</h1><p>${e.message}<p>`;
  },

  // 当请求头中有: Accpet: application/json 时候执行, 用于接口的错误处理
  json(e, ctx) {
    const proto = Object.getPrototypeOf(e);
    if (proto.constructor.name === 'UnprocessableEntityError') {
      return ctx.error(422, e.errors[0].message); // 处理 egg-validate 抛的异常
    }
    if (proto.constructor.name === 'JsonWebTokenError') {
      return ctx.error(401); // 处理 jsonwebtoken 抛的异常
    }
    return ctx.error(500, e.message);
  },
};
