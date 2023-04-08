'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { DataTypes } = Sequelize;
    await queryInterface.createTable('permissions', {
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
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('permissions');
  },
};
