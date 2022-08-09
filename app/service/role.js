'use strict';

const { Service } = require('egg');
const { Op } = require('sequelize');

class RoleService extends Service {
  /**
   * 获取所有角色信息
   */
  async getAllRoles() {
    const { Role, Permission } = this.ctx.model;
    return await Role.findAll(
      {
        include: {
          model: Permission,
          through: { attributes: [] },
          attributes: ['id', 'desc', 'pid', 'type'],
        },
      },
      {
        raw: true,
      }
    );
  }

  /**
   * 创建角色
   * @param {*} data 角色信息
   */
  async createRole(data) {
    return await this.ctx.model.Role.create(data);
  }

  /**
   * 删除角色(并且删除角色表中所有的关联数据)
   * @param {Number} id 角色ID
   */
  deleteRoleById(id) {
    const { Role, UserRole } = this.ctx.model;
    return this.ctx.model.transaction(transaction => {
      Role.destroy({ where: { id } }, { transaction });
      UserRole.destroy({ where: { role_id: id } }, { transaction });
    });
  }

  /**
   * 修改角色信息
   * @param {Number} id 角色ID
   * @param {Object} data 角色修改信息
   */
  async updateRoleInfoById(id, data) {
    return await this.ctx.model.Role.update(data, { where: { id } });
  }

  /**
   *给角色
   * @param {Number} roleId 角色ID
   * @param {Array} permissionIds 权限ID
   */
  async assignPermissions(roleId, permissionIds) {
    const { RolePermission } = this.ctx.model;
    const rows = [];
    const has = permissionIds.length > 0;
    const where = { role_id: { [Op.eq]: roleId } }; // role_id=roleId
    if (has) {
      permissionIds.forEach(id => {
        rows.push({ role_id: roleId, permission_id: id });
      });
    }

    // 开启事务: 将原来的删除, 增加新的
    const transaction = await this.ctx.model.transaction();
    try {
      await RolePermission.destroy({ where }, { transaction });
      if (has) await RolePermission.bulkCreate(rows, { transaction });
      transaction.commit();
    } catch (e) {
      transaction.rollback();
      throw new Error(e.message);
    }
  }
}

module.exports = RoleService;
