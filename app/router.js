'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { ctx, router, controller, middleware } = app;
  const { user, upload, assign, role, permission } = controller;

  // 应用中间件 sign: 数据签名验证 auth: 登录验证 rbac: 权限验证
  function applyMiddleware(options = ['sign', 'auth', 'rbac']) {
    const checks = [];
    for (const item of options) {
      checks.push(middleware[item]());
    }
    return checks;
  }

  const middlewares = applyMiddleware();

  // 登录
  router.post('/api/user/login', ...applyMiddleware(['sign']), user.login);

  // 修改用户密码
  router.post('/api/user/update_password', ...applyMiddleware(['sign', 'auth']), user.updatePassword);

  // 头像上传
  router.post('/upload/avatar', upload.avatar);

  // 给用户分配角色
  router.post('/api/userroles', ...middlewares, assign.assignRoles);

  // 给角色分配权限
  router.post('/api/roleperms', ...middlewares, assign.assignPermis);

  // 用户
  router.resources('users', '/api/users', ...middlewares, user);

  // 角色
  router.resources('roles', '/api/roles', ...middlewares, role);

  // 权限
  router.resources('permissions', '/api/permissions', ...middlewares, permission);
};
