'use strict';

module.exports = app => {
  const DataTypes = app.Sequelize;
  const Role = app.model.define(
    'role',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      role_name: {
        type: DataTypes.STRING(32),
        allowNull: true,
        comment: '角色名称',
      },
      role_desc: {
        type: DataTypes.STRING(128),
        allowNull: true,
        comment: '角色描述',
      },
    },
    {
      tableName: 'roles',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
      ],
    }
  );

  // 定义角色和权限的多对多关联关系
  Role.associate = () => {
    const { Role, Permission, RolePermission } = app.model;
    Role.belongsToMany(Permission, {
      through: RolePermission,
      foreignKey: 'role_id',
      otherKey: 'permission_id',
    });
  };

  return Role;
};
