'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const { user, upload, assign, role, permission } = controller;

  // 应用中间件
  function applyMiddleware(options = ['sign', 'auth', 'rbac']) {
    // const { sign, auth, rbac } = middleware;
    const checks = [];
    for (const item of options) {
      checks.push(middleware[item]());
    }
    return checks;
  }

  const checks = applyMiddleware();

  // 登录
  router.post('/api/user/login', ...applyMiddleware(['sign']), user.login);

  // 修改用户密码
  router.post(
    '/api/user/update_password',
    ...applyMiddleware(['sign', 'auth']),
    user.updatePassword
  );

  // 头像上传
  router.post('/upload/avatar', upload.avatar);

  // 给用户分配角色
  router.post('/api/userroles', ...checks, assign.assignRoles);

  // 给角色分配权限
  router.post('/api/roleperms', ...checks, assign.assignPermis);

  // 用户
  router.resources('users', '/api/users', ...checks, user);

  // 角色
  router.resources('roles', '/api/roles', ...checks, role);

  // 权限
  router.resources('permissions', '/api/permissions', ...checks, permission);
};
