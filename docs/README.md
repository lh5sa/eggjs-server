## 安装

```sh
git clone https://github.com/lh5sa/eggjs-server
cd server && npm i
cd client-vue && npm i
```

## 导入数据

- 使用 `sequelize-cli` 来填充和迁移
- 将 `/server/db.sql` 导入数据库

二者任选其一就好

## 修改数据库连接

- 修改 `/server/config/database`

```js
module.exports = {
  dialect: 'mysql', // 驱动类型
  host: '127.0.0.1', // 数据库服务器地址
  port: 3306, // 端口
  database: 'test', // 库名
  username: 'root', // 用户名
  password: 'root', // 密码
};
```

## 初始账号

- admin@qq.com
- 123456
