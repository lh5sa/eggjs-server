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
     * }], {});
     */
    const rows = [
      {
        desc: '用户管理',
        type: '0',
        method: 'NULL',
        icon: 'fa-users',
        path: '/',
        status: '0',
        pid: '0',
      },
      {
        desc: '用户列表',
        type: '0',
        method: 'NULL',
        icon: 'fa-user',
        path: '/users',
        status: '0',
        pid: '1',
      },
      {
        desc: '权限管理',
        type: '0',
        method: 'NULL',
        icon: 'fa-get-pocket',
        path: '/',
        status: '0',
        pid: '0',
      },
      {
        desc: '角色管理',
        type: '0',
        method: 'NULL',
        icon: 'fa-id-card',
        path: '/roles',
        status: '0',
        pid: '3',
      },
      {
        desc: '权限管理',
        type: '0',
        method: 'NULL',
        icon: 'fa-unlock',
        path: '/permissions',
        status: '0',
        pid: '3',
      },
      {
        desc: '用户管理',
        type: '1',
        method: '',
        icon: '',
        path: '',
        status: '0',
        pid: '0',
      },
      {
        desc: '用户列表',
        type: '1',
        method: 'get',
        icon: '',
        path: '/api/users',
        status: '0',
        pid: '6',
      },
      {
        desc: '增加用户',
        type: '1',
        method: 'post',
        icon: '',
        path: '/api/users',
        status: '0',
        pid: '6',
      },
      {
        desc: '修改用户信息',
        type: '1',
        method: 'put',
        icon: '',
        path: '/api/users/:id',
        status: '0',
        pid: '6',
      },
      {
        desc: '删除用户信息',
        type: '1',
        method: 'delete',
        icon: '',
        path: '/api/users/:id',
        status: '0',
        pid: '6',
      },
      {
        desc: '角色管理',
        type: '1',
        method: '',
        icon: '',
        path: '',
        status: '0',
        pid: '0',
      },
      {
        desc: '获取角色列表',
        type: '1',
        method: 'get',
        icon: '',
        path: '/api/roles',
        status: '0',
        pid: '12',
      },
      {
        desc: '添加角色',
        type: '1',
        method: 'post',
        icon: '',
        path: '/api/roles',
        status: '0',
        pid: '12',
      },
      {
        desc: '删除角色',
        type: '1',
        method: 'delete',
        icon: '',
        path: '/api/roles/:id',
        status: '0',
        pid: '12',
      },
      {
        desc: '修改角色信息',
        type: '1',
        method: 'patch',
        icon: '',
        path: '/api/roles/:id',
        status: '0',
        pid: '12',
      },
      {
        desc: '权限管理',
        type: '1',
        method: '',
        icon: '',
        path: '',
        status: '0',
        pid: '0',
      },
      {
        desc: '权限列表',
        type: '1',
        method: 'get',
        icon: '',
        path: '/api/permissions',
        status: '0',
        pid: '19',
      },
      {
        desc: '删除权限',
        type: '1',
        method: 'delete',
        icon: '',
        path: '/api/permissions/:id',
        status: '0',
        pid: '19',
      },
      {
        desc: '添加权限',
        type: '1',
        method: 'post',
        icon: '',
        path: '/api/permissions',
        status: '0',
        pid: '19',
      },
      {
        desc: '修改权限信息',
        type: '1',
        method: 'patch',
        icon: '',
        path: '/api/permissions/:id',
        status: '0',
        pid: '19',
      },
      {
        desc: '给角色分配权限',
        type: '1',
        method: 'post',
        icon: '',
        path: '/api/roleperms',
        status: '0',
        pid: '19',
      },
      {
        desc: '给用户添加角色',
        type: '1',
        method: 'post',
        icon: '',
        path: '/api/userroles',
        status: '0',
        pid: '19',
      },
    ];

    const rows2 = [];
    for (let i = 1; i <= rows.length; i++) {
      rows2.push({
        permission_id: i,
        role_id: 1,
      });
    }
    await queryInterface.bulkInsert('permissions', rows);
    await queryInterface.bulkInsert('role_permission', rows2);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('permissions', null, {});
    await queryInterface.bulkDelete('role_permission', null, {});
  },
};
