'use strict';

module.exports = {
  sequelize: {
    dialect: 'mysql',
    host: 'sa_mysql', // docker 容器名
    port: 3306,
    database: 'simple_admin',
    username: 'root',
    password: 'root',
  },
};
