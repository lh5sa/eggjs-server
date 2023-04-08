'use strict';
module.exports = (app) => {
  const DataTypes = app.Sequelize;
  const Permission = app.model.define(
    'permissions',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      desc: {
        type: DataTypes.STRING(64),
        allowNull: false,
        defaultValue: '',
        comment: '权限描述',
      },
      type: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        comment: '权限类型(0:菜单权限 1:路由权限 2:api权限)',
      },
      method: {
        type: DataTypes.STRING(32),
        allowNull: true,
        comment: '请求方式(get,post等)',
      },
      icon: {
        type: DataTypes.STRING(32),
        allowNull: true,
        comment: '路由权限的icon',
      },
      path: {
        type: DataTypes.STRING(32),
        allowNull: false,
        comment: '权限地址',
      },
      status: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        comment: '是否可用(0:正常 1:禁用)',
      },
      pid: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        comment: '父级权限ID',
      },
    },
    {
      tableName: 'permissions',
      timestamps: false,
    }
  );

  // 定义角色和权限的多对多关联关系
  Permission.associate = () => {
    const { Role, Permission, RolePermission } = app.model;
    Permission.belongsToMany(Role, {
      through: RolePermission,
      foreignKey: 'permission_id',
      otherKey: 'role_id',
    });
  };

  return Permission;
};
