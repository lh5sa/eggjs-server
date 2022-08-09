'use strict';

/**
 * 根据请求方式判断 path 是否能够匹配 url
 * @param {String} path 权限路径
 * @param {String} url 请求路径
 * @param {String} method 请求方式
 * @return {Boolean} 是否匹配成功
 */
function check(path, url, method, id) {
  method = method.toLowerCase();
  const allowMethods = ['get', 'post', 'delete', 'patch'];
  if (!allowMethods.includes(method)) {
    throw new Error('未知的请求方式');
  }
  if (method === 'delete' || method === 'patch') {
    path = path.replace(':id', id);
  }
  return path === url;
}

module.exports = () => async (ctx, next) => {
  // ctx.user 在 auth 中间件中的赋值的属性,
  // 由于会先验证登录信息, 所以必然会有这个属性
  const uid = ctx.user.id;
  const { id } = ctx.params;
  const { path: url, method } = ctx.request;
  // TODO: set permission info cache
  const permissions = await ctx.service.user.getUserPermis(uid, 1);
  for (let i = 0, l = permissions.length; i < l; i++) {
    if (check(permissions[i].path, url, method, id)) {
      return await next();
    }
  }
  return ctx.error(403);
};
