## 角色列表

- 请求方式: `GET`
- 请求路径: `/api/roles`
- 请求参数: `无`

- 响应示例:

```json
{
  "success": true,
  "code": 200,
  "msg": "请求成功",
  "data": [
    {
      "id": 1,
      "role_name": "超级管理员",
      "role_desc": "拥有所有权限",
      "permissions": [
        {
          "id": 30,
          "desc": "获取用户列表",
          "pid": 19,
          "type": 1
        }
      ]
    }
  ]
}
```

- 响应数据说明:

| 字段            | 必选 | 类型                | 说明                              |
| :-------------- | :--- | :------------------ | :-------------------------------- |
| id              | 是   | int                 | 角色 ID                           |
| role_name       | 是   | string              | 角色 名称                         |
| role_desc       | 是   | string              | 角色 描述                         |
| permissions     | 是   | Array\<Permission\> | 角色 拥有的权限                   |
| Permission.id   | 是   | int                 | 权限 ID                           |
| Permission.desc | 是   | string              | 权限描述                          |
| Permission.pid  | 是   | int                 | 权限父级 ID                       |
| Permission.type | 是   | int                 | 权限类型(0: 路由权限 1: api 权限) |

## 创建角色信息

- 请求方式: `POST`
- 请求路径: `/api/roles`
- 请求参数:

| 字段      | 必选 | 类型   | 说明     |
| :-------- | :--- | :----- | :------- |
| role_name | 是   | string | 角色名称 |
| role_desc | 是   | string | 角色描述 |

- 响应示例:

```json
{
  "success": true,
  "code": 200,
  "msg": "创建成功",
  "data": null
}
```

## 修改角色信息

- 请求方式: `PATCH`
- 请求路径: `/api/roles/:id`
- 请求参数:

| 字段      | 必选 | 类型   | 说明     |
| :-------- | :--- | :----- | :------- |
| role_name | 否   | string | 角色名称 |
| role_desc | 否   | string | 角色描述 |

- 响应示例:

```json
{
  "success": true,
  "code": 200,
  "msg": "修改成功",
  "data": null
}
```

## 删除角色信息

- 请求方式: `DELETE`
- 请求路径: `/api/roles/:id`
- 请求参数: `无`
- 响应示例:

```json
{
  "success": true,
  "code": 200,
  "msg": "删除成功",
  "data": null
}
```

## 给角色分配权限

- 请求方式: `POST`
- 请求路径: `/api/roleperms`
- 请求参数:

| 字段           | 必选 | 类型         | 说明         |
| :------------- | :--- | :----------- | :----------- |
| role_id        | 是   | int          | 角色 ID      |
| permission_ids | 是   | Array\<int\> | 权限 ID 数组 |

- 响应示例:

```json
{
  "success": true,
  "code": 200,
  "msg": "分配成功",
  "data": null
}
```
