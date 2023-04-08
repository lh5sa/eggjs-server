'use strict';

const { Service } = require('egg');
const { Op } = require('sequelize');

class PermissionService extends Service {
  /**
   * 获取权限数据并分页
   * @param {Object} where 数据查询条件
   * @param {Number} page 当前页
   * @param {Number} size 当前页每页多少条数据
   */
  async getPermis(where, page, size) {
    return await this.ctx.model.Permission.findAndCountAll({
      where,
      offset: size * (page - 1),
      limit: size,
    });
  }

  /**
   * 根据角色ID获取所有的权限ID
   * @param {Array} roleIds 角色ID
   */
  async getPermisIdByRolesId(roleIds = []) {
    if (roleIds.length === 0) return [];
    const rolePermis = await this.ctx.model.RolePermission.findAll(
      {
        attributes: ['permission_id'],
        where: {
          role_id: {
            [Op.in]: roleIds,
          },
        },
      },
      {
        raw: true,
      }
    );
    return rolePermis.map((item) => item.permission_id);
  }

  /**
   * 根据用户ID查询出所有的角色ID
   * @param {*} uid 用户ID
   */
  async getRolesIdByUid(uid) {
    const { UserRole } = this.ctx.model;
    const userRoles = await UserRole.findAll(
      {
        attributes: ['role_id'],
        where: {
          user_id: uid,
        },
      },
      {
        raw: true,
      }
    );
    return userRoles.map((item) => item.role_id);
  }

  /**
   * 获取所有权限数据并生成树形结构
   */
  async getAllPermisTree() {
    const datas = await this.ctx.model.Permission.findAll(
      {
        where: { status: 0 },
      },
      {
        raw: true,
      }
    );
    return this.getTree(datas);
  }

  /**
   * 无限分类(将线性数据转成树形数据)
   * @param {Array} data
   * @returns {Array}
   */
  getTree(data) {
    const cloneDatas = JSON.parse(JSON.stringify(data));
    return cloneDatas.filter((root) => {
      const children = cloneDatas.filter((child) => root.id === child.pid);
      if (children.length > 0) {
        root.children = children;
      }
      return root.pid === 0;
    });
  }

  /**
   * 根据权限ID删除权限
   * @param {Number} id 权限ID
   */
  async deletePermissionById(id) {
    return await this.ctx.model.Permission.destroy({ where: { id } });
  }

  /**
   * 根据权限ID修改权限信息
   * @param {Number} id 权限ID
   * @param {Object} data 权限信息
   */
  async updatePermissionById(id, data) {
    return await this.ctx.model.Permission.update(data, { where: { id } });
  }

  /**
   * 创建权限
   * @param {Object} data 权限信息
   */
  async createPermission(data) {
    return await this.ctx.model.Permission.create(data);
  }
}

module.exports = PermissionService;
