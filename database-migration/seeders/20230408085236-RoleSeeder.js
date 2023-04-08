'use strict';

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
       * }], {})
      */
      await queryInterface.bulkInsert(
        'roles',
        [
          {
            role_name: '超级管理员',
            role_desc: '拥有所有权限',
          },
          {
            role_name: '用户管理员',
            role_desc: '可以查看用户管理',
          },
        ],
        {}
      )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('roles', null, {});
  },
};
