'use strict';

const { Controller } = require('egg');
const createRoleRule = require('../validate/createRoleRule');

class UserController extends Controller {
  // 获取所有的角色
  async index() {
    const { ctx } = this;
    const roles = await ctx.service.role.getAllRoles();
    this.ctx.success(roles, 200);
  }

  // 增加角色
  async create() {
    const { ctx } = this;
    const data = ctx.request.body;
    ctx.validate(createRoleRule, data);
    await ctx.service.role.createRole(data);
    ctx.success(data, 201);
  }

  // 删除角色
  async destroy() {
    const { ctx } = this;
    const id = Number(ctx.params.id);
    if (!id) throw new Error('ID有误');
    await ctx.service.role.deleteRoleById(id);
    ctx.success(id, 200);
  }

  // 修改角色信息
  async update() {
    const { ctx } = this;
    const data = ctx.request.body;
    const id = Number(ctx.params.id);
    if (!id) throw new Error('ID 有误');
    ctx.validate(createRoleRule, data);
    await ctx.service.role.updateRoleInfoById(id, data);
    ctx.success(data, 200);
  }
}

module.exports = UserController;
