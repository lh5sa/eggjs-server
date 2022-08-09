'use strict';

const { Op } = require('sequelize');
const { Controller } = require('egg');
const createPermissionRule = require('../validate/createPermissionRule');
const updatePermissionRule = require('../validate/updatePermissionRule');

class PermissionController extends Controller {
  /**
   * 获取所有权限
   */
  async index() {
    const { ctx } = this;
    let { page, size, type, desc } = ctx.query;
    const where = {};

    // 如果有传递 type 则验证 type 是否有误
    // 0:路由权限 1:API权限 2:获取所有可用权限树形结构数据(不分页)
    if (type) {
      type = Number(type);
      const allowTypes = [0, 1, 2];
      if (!allowTypes.includes(type)) {
        throw new Error('未识别的type值');
      }
      where.type = type;
    }

    if (type === 2) {
      const datas = await ctx.service.permission.getAllPermisTree();
      ctx.success(datas);
      return;
    }

    if (desc) {
      where.desc = { [Op.like]: `%${desc}%` };
    }
    page = Number(page) || 1;
    size = Number(size) || 10;
    const datas = await ctx.service.permission.getPermis(where, page, size);
    ctx.success(datas);
  }

  /**
   * 删除权限
   */
  async destroy() {
    const { ctx } = this;
    const id = Number(ctx.params.id);
    if (!id) throw new Error('ID 有误');
    await this.ctx.service.permission.deletePermissionById(id);
    ctx.success(id, 200);
  }

  /**
   * 修改权限信息
   */
  async update() {
    const { ctx } = this;
    const id = Number(ctx.params.id);
    if (!id) throw new Error('ID 有误');
    const data = ctx.request.body;
    ctx.validate(updatePermissionRule, data);
    await this.ctx.service.permission.updatePermissionById(id, data);
    ctx.success(200);
  }

  /**
   * 增加权限
   */
  async create() {
    const { ctx } = this;
    const data = ctx.request.body;
    ctx.validate(createPermissionRule, data);
    await this.service.permission.createPermission(data);
    ctx.success(200);
  }
}

module.exports = PermissionController;
