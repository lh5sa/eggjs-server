## 权限列表

- 请求方式: `GET`
- 请求路径: `/api/permissions`
- 请求参数:

| 字段 | 必选 | 类型 | 说明                                                               |
| :--- | :--- | :--- | :----------------------------------------------------------------- |
| page | 是   | int  | 第几页                                                             |
| size | 否   | int  | 每页多少条                                                         |
| type | 否   | int  | 权限类型(0:路由权限 1:api 权限 2: 所有权限(不分页, 树形结构数据))) |
| desc | 否   | int  | 搜索关键字(权限描述)                                               |

- 响应示例:

```json
{
  "success": true,
  "code": 200,
  "msg": "请求成功",
  "data": {
    "count": 2,
    "rows": [
      {
        "id": 1,
        "desc": "用户管理",
        "type": 0,
        "method": null,
        "icon": "el-icon-user",
        "path": "",
        "status": 0,
        "pid": 0
      }
    ]
  }
}
```

- 响应数据说明:

| 字段              | 必选 | 类型                | 说明                                                      |
| :---------------- | :--- | :------------------ | :-------------------------------------------------------- |
| count             | 是   | int                 | 总共有多少条数据                                          |
| rows              | 是   | Array\<Permission\> | 权限信息数据                                              |
| Permission.id     | 是   | int                 | 权限 ID                                                   |
| Permission.desc   | 是   | string              | 权限描述                                                  |
| Permission.type   | 是   | string              | 权限类型(0:路由权限 1:api 权限)                           |
| Permission.method | 是   | string              | api 权限的属性, 请求方式                                  |
| Permission.icon   | 是   | string              | 路由权限的属性, 侧边栏菜单 icon, 如果为空不会显示到侧边栏 |
| Permission.path   | 是   | string              | 权限路径                                                  |
| Permission.status | 是   | int                 | 权限状态(0: 正常)                                         |
| Permission.pid    | 是   | int                 | 权限的父级 ID                                             |

## 创建权限信息

- 请求方式: `POST`
- 请求路径: `/api/permissions`
- 请求参数:

| 字段   | 必选 | 类型   | 说明                            |
| :----- | :--- | :----- | :------------------------------ |
| type   | 是   | string | 权限类型(0:路由权限 1:api 权限) |
| desc   | 是   | string | 权限描述                        |
| pid    | 是   | string | 权限的父级 ID(0: 顶级权限)      |
| path   | 否   | string | 权限路径                        |
| method | 否   | string | api 权限的请求方式(GET,POST 等) |
| icon   | 否   | string | 路由权限的图标                  |

- 响应示例:

```json
{
  "success": true,
  "code": 200,
  "msg": "创建成功",
  "data": null
}
```

## 修改权限信息

- 请求方式: `PATCH`
- 请求路径: `/api/permissions/:id`
- 请求参数:

| 字段   | 必选 | 类型   | 说明                            |
| :----- | :--- | :----- | :------------------------------ |
| type   | 是   | string | 权限类型(0:路由权限 1:api 权限) |
| desc   | 是   | string | 权限描述                        |
| pid    | 是   | string | 权限的父级 ID(0: 顶级权限)      |
| path   | 否   | string | 权限路径                        |
| method | 否   | string | api 权限的请求方式(GET,POST 等) |
| icon   | 否   | string | 路由权限的图标                  |

```json
{
  "success": true,
  "code": 200,
  "msg": "修改成功",
  "data": null
}
```

## 删除权限信息

- 请求方式: `DELETE`
- 请求路径: `/api/permissions/:id`
- 请求参数: `无`

```json
{
  "success": true,
  "code": 200,
  "msg": "删除成功",
  "data": null
}
```
