'use strict';
module.exports = (app) => {
  const DataTypes = app.Sequelize;
  return app.model.define(
    'user_role',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '用户ID',
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '角色ID',
      },
    },
    {
      sequelize: app.sequelize,
      tableName: 'user_role',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'user_id',
          using: 'BTREE',
          fields: [{ name: 'user_id' }],
        },
        {
          name: 'role_id',
          using: 'BTREE',
          fields: [{ name: 'role_id' }],
        },
      ],
    }
  );
};
