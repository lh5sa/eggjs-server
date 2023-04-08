'use strict';
const bcrypt = require('bcryptjs');

module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;
  const User = app.model.define(
    'user',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: STRING(32),
      email: STRING(64),
      avatar: STRING(128),
      status: INTEGER(1),
      password: {
        type: STRING(255),
        set(val) {
          // 使用 bcrypt 加密算法加密用户密码
          const password = bcrypt.hashSync(val, 10);
          this.setDataValue('password', password);
        },
      },
    },
    {
      tableName: 'users',
      timestamps: true, // 启用时间戳(createdAt, updatedAt)
      updatedAt: false, // 不想要 updatedAt
      createdAt: 'created_at', // 想要  createdAt 但是希望名称叫做 created_at
    }
  );

  // 定义和 roles 表的多对多关系
  User.associate = () => {
    const { User, Role, UserRole } = app.model;
    User.belongsToMany(Role, {
      through: UserRole,
      foreignKey: 'user_id',
      otherKey: 'role_id',
    });
  };

  return User;
};
