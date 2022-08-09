'use strict';
const jwt = require('jsonwebtoken');

/**
 * 登录信息验证中间件
 */
module.exports = () => async (ctx, next) => {
  // 判断请求头中是否有 token
  const token = ctx.request.headers['user-token'];
  if (!token) {
    ctx.error(401);
    return;
  }

  // 判断 token 是否正确(docs: https://www.npmjs.com/package/jsonwebtoken)
  ctx.user = await jwt.verify(token, ctx.app.config.keys);
  await next();
};
