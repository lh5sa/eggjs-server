'use strict';

const Mock = require('mockjs');
// mockjs: http://mockjs.com/

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    // 由于 bcryptjs 生成密码比较慢, 而且测试数据, 密码一样更方便
    // bcryptjs -> 123456
    const password = '$2b$10$RgbaCU24JbeyoRN6o7ntn.qA3Zc2o2khe6W38gYU4vwipFG37KxnG';
    const date = new Date();
    const data = Mock.mock({
      'rows|20': [
        {
          'id|+1': 1,
          username: '@cname',
          password,
          email: '@email',
          status: 0,
          avatar: '@url',
          created_at: date,
        },
      ],
    });

    // 默认账户 id = 1
    data.rows[0].username = 'admin';
    data.rows[0].email = 'admin@qq.com';
    await queryInterface.bulkInsert('users', data.rows, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  },
};
