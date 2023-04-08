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
    const { STRING, INTEGER, DATE } = Sequelize.DataTypes;
    await queryInterface.createTable(
      'users',
      {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        username: STRING,
        email: STRING,
        avatar: STRING,
        status: INTEGER,
        password: STRING,
        created_at: DATE,
      },
      {
        tableName: 'users',
        timestamps: true, // 启用时间戳(createdAt, updatedAt)
        updatedAt: false, // 不想要 updatedAt
        createdAt: 'created_at', // 想要  createdAt 但是希望名称叫做 created_at
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
    await queryInterface.dropTable('users');
  },
};
