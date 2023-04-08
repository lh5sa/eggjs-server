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
    await queryInterface.createTable(
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
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('role_permission');
  },
};
