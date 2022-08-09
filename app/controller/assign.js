'use strict';
const { Controller } = require('egg');
const createUserRoleRule = require('../validate/createUserRoleRule');
const createRolePermRule = require('../validate/createRolePermRule');

class AssignController extends Controller {
  /**
   * 给用户分配角色
   */
  async assignRoles() {
    const { ctx } = this;
    const { request, service } = ctx;
    const data = request.body;
    ctx.validate(createUserRoleRule, data);
    await service.user.assignRoles(data.user_id, data.role_ids);
    ctx.success();
  }

  /**
   * 给角色分配权限
   */
  async assignPermis() {
    const { ctx } = this;
    const { request, service } = ctx;
    const data = request.body;
    ctx.validate(createRolePermRule, data);
    await service.role.assignPermissions(data.role_id, data.permission_ids);
    ctx.success();
  }
}
module.exports = AssignController;
