## 介绍

个人写练手项目的服务端, 因为每次学个新的东西老希望写个项目练手, 没有服务端 API, 就很难受, 所有就有了这个项目

功能也不复杂, RBAC 后台的 API, 提供了基本的增删改查(查询有分页), [在线文档](https://lh5sa.github.io/eggjs-server/#/)

## 数据库相关

需要手动创建数据库 `create database xxx`, 然后再导入或者迁移

- 数据库环境准备: 默认使用 sequelize + mysql, 理论上来说 sequelize 可以支持其他数据库例如 pgsql 之类的, 但是我没有测试过
- 数据库迁移使用: 你可以直接用[sequelize-cli](https://www.sequelize.cn/other-topics/migrations)来填充, 也可以手动导入 `db.sql`
- 数据库数据填充: 填充一些假数据, 让项目可以有数据跑起来, 没有数据的, 没有办法登录

```sh
# 迁移 / 填充
npx sequelize-cli
```

## 客户端

练手项目, 所以代码可能并没有特别完美特别优雅, 见笑了, 欢迎给我提 issue 或 pr

- 关于加密/签名规则请查看[文档](https://lh5sa.github.io/eggjs-server/#/)

* [vue2-client] (https://github.com/lh5sa/vue2-client)
* [vue3-client] (https://github.com/lh5sa/vue3-client)

## 快速开始

```sh
npm i
npm run dev

# open http://localhost:7001/
```

## 注意事项

默认接口都是开启数据签名验证的, 如果想要关掉签名验证, 可以修改 `/app/middleware/sign.js`

## 相关文档

- eggjs: https://eggjs.org https://eggjs.github.io/zh/guide/
- sequelize: https://www.sequelize.cn/
