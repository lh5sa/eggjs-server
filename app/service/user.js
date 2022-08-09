'use strict';

const bcrypt = require('bcryptjs');
const { Service } = require('egg');
const { Op } = require('sequelize');

class UserService extends Service {
  /**
   * 根据分页和搜索条件获取用户信息
   * @param {Object} where 查询用户的条件
   * @param {Number} page 当前分页
   * @param {Number} pageSize 当前页每页多少条
   * @param {Boolean} getPermis 是否根据角色获取权限信息
   */
  async getUserRolePermissions(where, page, pageSize, getPermis = false) {
    const { User, Role, Permission } = this.ctx.model;
    const include = {
      // 用户多对多查询出所有的角色
      model: Role,
      through: { attributes: [] },
      attributes: ['id', 'role_name'],
    };
    if (getPermis) {
      // 嵌套连表查询: 角色多对多查询出所有的权限
      include.include = {
        model: Permission,
        through: { attributes: [] }, // 去除中间表的字段
        where: { status: 0 },
      };
    }
    return User.findAndCountAll({
      attributes: { exclude: ['password'] },
      where,
      offset: pageSize * (page - 1),
      limit: pageSize,
      include,
    });
  }

  /**
   * 获取用户所有路由权限(去重)
   * @param {Number} uid 用户ID
   * @param {Number} type 获取权限类型 0:路由权限 1:api权限 2: 所有
   * @throws {Error} 错误的获取类型*/
  async getUserPermis(uid, type = 2) {
    const allowTypes = [0, 1, 2];
    if (!allowTypes.includes(type)) {
      throw new Error('未知的数据获取类型');
    }
    const { User, Role, Permission } = this.ctx.model;
    const where = { type, status: 0 };
    type === 2 && delete where.type;
    const userinfos = await User.findOne({
      attributes: { exclude: ['password'] },
      where: { id: uid, status: 0 },
      include: {
        model: Role,
        through: { attributes: [] },
        attributes: ['id', 'role_name'],
        include: {
          where,
          model: Permission,
          through: { attributes: [] },
        },
      },
    });
    if (!userinfos) {
      return [];
    }
    if (!userinfos.roles.length) {
      return [];
    }
    const permis = Object.create(null);
    userinfos.roles.forEach(role => {
      if (role.permissions.length) {
        role.permissions.forEach(item => {
          if (!permis[item.id]) {
            permis[item.id] = item;
          }
        });
      }
    });
    return Object.values(permis);
  }

  /**
   * 注册用户数据
   * @param {Object} data
   */
  async registerUser(data) {
    const { User } = this.ctx.model;
    const userExists = await User.findOne({
      attributes: ['id'],
      where: {
        [Op.or]: {
          email: data.email,
          username: data.username,
        },
      },
    });
    if (userExists) throw new Error('该邮箱或用户名已经存在');
    const newUser = await User.create(data);
    return newUser.dataValues;
  }

  /**
   * 根据条件查询用户信息
   * @param {Object} user
   */
  async loginByEmail({ email, password }) {
    const { User } = this.ctx.model;

    // 根据邮箱查询用户是否存在
    let user = await User.findOne({
      where: { email },
    });

    if (!user) throw new Error('邮箱或密码有误');

    // 判断状态是否有误
    if (user.status !== 0) {
      throw new Error('用户状态有误, 无法登陆');
    }

    // 判断密码是否有误
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      throw new Error('邮箱或密码有误');
    }

    user = user.dataValues;
    delete user.password;
    return user;
  }

  /**
   * 根据id删除对应的用户
   * @param {Number} uid
   */
  async deleteUserById(id) {
    return await this.ctx.model.User.destroy({ where: { id } });
  }

  /**
   * 根据ID修改用户信息
   * @param {Number} id 用户ID
   * @param {Object} data 要修改的用户信息
   */
  async updateUserById(id, data) {
    const { User } = this.ctx.model;
    const { username, email } = data;
    const andWhere = { id: { [Op.ne]: id } };
    let neenCheck = false;
    if (username && email) {
      neenCheck = true;
      andWhere[Op.or] = { username, email };
    } else if (username) {
      neenCheck = true;
      andWhere.username = username;
    } else if (email) {
      neenCheck = true;
      andWhere.email = email;
    }

    if (neenCheck) {
      const userExists = await User.findOne({
        attributes: ['id'],
        where: { [Op.and]: andWhere },
      });
      if (userExists) throw new Error('该邮箱或用户名已经存在');
    }

    return await User.update(data, { where: { id } });
  }

  /**
   * 分配角色
   * @param {Number} uid 用户ID
   * @param {Array} roleIds 角色ID
   */
  async assignRoles(uid, roleIds) {
    const { UserRole } = this.ctx.model;

    const rows = [];
    const hasRoles = roleIds.length > 0;
    const where = { user_id: { [Op.eq]: uid } }; // user_id=uid
    hasRoles && roleIds.forEach(id => rows.push({ user_id: uid, role_id: id }));

    // 开启事务: 将原来的删除, 增加新的
    const transaction = await this.ctx.model.transaction();
    try {
      await UserRole.destroy({ where }, { transaction });
      if (hasRoles) await UserRole.bulkCreate(rows, { transaction });
      transaction.commit();
    } catch (e) {
      transaction.rollback();
      throw new Error(e.message);
    }
  }

  /**
   * 更新用户密码
   * @param {Number} id 用户ID
   * @param {Object} data 新密码和旧密码
   */
  async updatePassword(id, data) {
    const { User } = this.ctx.model;
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('用户不存在');
    }

    // 旧密码是否有误, 正确就直接修改
    const isValid = bcrypt.compareSync(data.old_password, user.password);
    if (!isValid) {
      throw new Error('邮箱或密码有误');
    }
    user.password = data.new_password;
    return await user.save();
  }
}

module.exports = UserService;
