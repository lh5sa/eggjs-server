'use strict';

const jwt = require('jsonwebtoken');
const { Controller } = require('egg');
const loginRule = require('../validate/loginRule');
const registerUserRule = require('../validate/registerUserRule');
const updateUserinfoRule = require('../validate/updateUserinfoRule');
const updatePasswordRule = require('../validate/updatePasswordRule');
const { Op } = require('sequelize');

class UserController extends Controller {
  //  用户列表
  async index() {
    const { query, service } = this.ctx;
    let { page, size, type, content } = query;
    type = Number(type);
    page = Number(page) || 1;
    size = Number(size) || 10;

    const where = {};
    if (type && content) {
      // eslint-disable-next-line default-case
      switch (type) {
        case 1:
          where.id = content;
          break;
        case 2:
          where.username = { [Op.like]: `%${content}%` };
          break;
        case 3:
          where.email = { [Op.like]: `%${content}%` };
          break;
      }
    }
    const users = await service.user.getUserRolePermissions(where, page, size);
    this.ctx.success(users);
  }

  // 删除用户
  async destroy() {
    const uid = Number(this.ctx.params.id);
    if (!uid) throw new Error('ID 有误');
    await this.ctx.service.user.deleteUserById(uid);
    this.ctx.success(uid); // 删除成功返回被删除的用户ID
  }

  // 修改用户信息
  async update() {
    const { ctx } = this;
    const id = ctx.params.id;
    const infos = ctx.request.body;
    if (!id) throw new Error('必须传递用户ID参数');
    if (Object.keys(infos).length === 0) throw new Error('请传递修改的内容');
    ctx.validate(updateUserinfoRule, infos);
    await ctx.service.user.updateUserById(id, infos);
    ctx.success(id, 200);
  }

  // 创建新用户
  async create() {
    const { ctx } = this;
    const data = ctx.request.body;
    ctx.validate(registerUserRule, data);
    const res = await ctx.service.user.registerUser(data);
    ctx.success(res);
  }

  // 登录
  async login() {
    const { ctx } = this;
    const { request, service } = ctx;
    const data = request.body;
    ctx.validate(loginRule, data);
    const user = await service.user.loginByEmail(data);
    user.token = jwt.sign(user, this.config.keys);
    user.permissions = await service.user.getUserPermis(user.id, 0);
    ctx.success(user);
  }

  // 修改密码
  async updatePassword() {
    const { ctx } = this;
    const { request, service } = ctx;
    const data = request.body;
    ctx.validate(updatePasswordRule, data);
    await service.user.updatePassword(ctx.user.id, data);
    ctx.success();
  }
}

module.exports = UserController;
