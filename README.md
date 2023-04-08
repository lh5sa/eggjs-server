## 介绍

个人写练手项目的服务端, 因为每次学个新的东西老希望写个项目练手, 没有服务端 API, 就很难受, 所有就有了这个项目

功能也不复杂, RBAC 后台的 API, 提供了基本的增删改查(查询有分页), [在线文档](https://lh5sa.github.io/eggjs-server/#/)

## 数据库相关

- 数据库环境准备: 默认使用 sequelize + mysql, 理论上来说 sequelize 可以支持其他数据库例如 pgsql 之类的, 但是我没有测试过

### 迁移/填充数据

需要手动创建数据库 `create database xxx`, 建议使用 `utf8mb4` 字符集

然后手动导入 `db.sql`, 也可以使用命令行来迁移和填充数据

```sh
# 注意执行命令时, 需要在 database-migration 目录下执行
npx sequelize-cli db:migrate
npx sequelize-cli db:seed
```

> 迁移

注意需要修改数据库链接配置 `database/config/config.json`, 这个是配置是给 `sequelize-cli` 用的

然后直接用[sequelize-cli](https://www.sequelize.cn/other-topics/migrations)命令来迁移,

> 填充

填充一些假数据, 让项目可以有数据跑起来, 没有数据的, 没有办法登录, 如果是直接导入的 sql 文件, 就不需要再填充了

## 客户端

练手项目, 所以代码可能并没有特别完美特别优雅, 见笑了, 欢迎给我提 issue 或 pr

- 关于加密/签名规则请查看[文档](https://lh5sa.github.io/eggjs-server/#/)

* [vue2-client](https://github.com/lh5sa/vue2-client)
* [vue3-client](https://github.com/lh5sa/vue3-client)

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
