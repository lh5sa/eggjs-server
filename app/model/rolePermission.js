'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  return app.model.define(
    'role_permission',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      permission_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        comment: '权限ID',
      },
      role_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        comment: '角色ID',
      },
    },
    {
      sequelize: app.sequelize,
      tableName: 'role_permission',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'role_key',
          using: 'BTREE',
          fields: [{ name: 'role_id' }],
        },
        {
          name: 'permission_key',
          using: 'BTREE',
          fields: [{ name: 'permission_id' }],
        },
      ],
    }
  );
};
