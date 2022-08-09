## 安装

```sh
git clone https://gitee.com/liaohui5/simple-admin
cd server && npm i
cd client-vue && npm i
```

## 导入数据

- 将 `/server/db.sql` 导入数据库

## 修改数据库连接

- 修改 `/server/config/config.default.js` 中的 `config.sequelize`

```js
config.sequelize = {
  dialect: "mysql", // 驱动类型
  host: "127.0.0.1", // 数据库服务器地址
  port: 3306, // 端口
  database: "test", // 库名
  username: "root", // 用户名
  password: "root", // 密码
};
```

## 运行

```
cd server && npm run dev
cd client-vue && npm run dev
```

## 初始账号

- admin@qq.com
- 123456
