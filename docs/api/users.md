## 登录

- 请求方式: `POST`
- 请求路径: `/api/user/login`
- 请求参数:

| 字段     | 必选 | 类型   | 说明     |
| :------- | :--- | :----- | :------- |
| email    | 是   | string | 用户邮箱 |
| password | 是   | string | 用户密码 |

- 响应示例:

```json
{
  "success": true,
  "code": 200,
  "msg": "请求成功",
  "data": {
    "id": 1,
    "username": "admin",
    "email": "admin@qq.com",
    "avatar": "http://localhost:7001/public/uploads/avatar/202012/202012201926e87955ddc40c1.png",
    "status": 0,
    "created_at": "2020-12-18T07:08:56.000Z",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AcXEuY29tIiwiYXZhdGFyIjoiaHR0cDovL2xvY2FsaG9zdDo3MDAxL3B1YmxpYy91cGxvYWRzL2F2YXRhci8yMDIwMTIvMjAyMDEyMjAxOTI2ZTg3OTU1ZGRjNDBjMS5wbmciLCJzdGF0dXMiOjAsImNyZWF0ZWRfYXQiOiIyMDIwLTEyLTE4VDA3OjA4OjU2LjAwMFoiLCJpYXQiOjE2MDg5MTIxNTV9.5KkS_-V1nGcnw1cmJu3bL5IZlDsBvef9ikmY9pQzLSg",
    "permissions": [
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
| id                | 是   | int                 | 用户 ID                                                   |
| username          | 是   | string              | 用户名称                                                  |
| email             | 是   | string              | 用户邮箱                                                  |
| avatar            | 是   | string              | 用户头像 URL                                              |
| status            | 是   | int                 | 用户状态(0:正常,异常状态不能登录)                         |
| created_at        | 是   | string              | 用户创建时间                                              |
| token             | 是   | string              | 用户登录 token                                            |
| permissions       | 是   | Array\<Permission\> | 用户拥有的所有路由权限                                    |
| Permission.id     | 是   | int                 | 权限 ID                                                   |
| Permission.desc   | 是   | string              | 权限描述                                                  |
| Permission.type   | 是   | string              | 权限类型(0:路由权限 1:api 权限)                           |
| Permission.method | 是   | string              | api 权限的属性, 请求方式                                  |
| Permission.icon   | 是   | string              | 路由权限的属性, 侧边栏菜单 icon, 如果为空不会显示到侧边栏 |
| Permission.path   | 是   | string              | 权限路径                                                  |
| Permission.status | 是   | int                 | 权限状态(0: 正常)                                         |
| Permission.pid    | 是   | int                 | 权限的父级 ID                                             |

## 修改用户密码

- 请求方式: `POST`
- 请求路径: `/api/user/update_password`
- 请求参数:

| 字段         | 必选 | 类型   | 说明   |
| :----------- | :--- | :----- | :----- |
| old_password | 是   | string | 原密码 |
| new_password | 是   | string | 新密码 |

- 响应示例:

```json
{
  "success": true,
  "code": 200,
  "msg": "修改成功",
  "data": null
}
```

## 用户列表

- 请求方式: `GET`
- 请求路径: `/api/users`
- 请求参数:

| 字段    | 必选 | 类型 | 说明                                    |
| :------ | :--- | :--- | :-------------------------------------- |
| page    | 是   | int  | 第几页                                  |
| size    | 否   | int  | 每页多少条                              |
| type    | 否   | int  | 搜索类型(1:用户 ID 2:用户名 3:用户邮箱) |
| content | 否   | int  | 搜索内容                                |

- 响应示例:

```json
{
  "success": true,
  "code": 200,
  "msg": "请求成功",
  "data": {
    "count": 1,
    "rows": [
      {
        "id": 1,
        "username": "admin",
        "email": "admin@qq.com",
        "avatar": "http://localhost:7001/public/uploads/avatar/202012/202012201926e87955ddc40c1.png",
        "status": 0,
        "created_at": "2020-12-18T07:08:56.000Z",
        "roles": [{ "id": 1, "role_name": "超级管理员" }]
      }
    ]
  }
}
```

- 响应数据说明:

| 字段            | 必选 | 类型          | 说明                    |
| :-------------- | :--- | :------------ | :---------------------- |
| count           | 是   | int           | 总共有多少条数据        |
| rows            | 是   | Array\<User\> | 用户信息数据            |
| User.id         | 是   | int           | 用户 ID                 |
| User.username   | 是   | string        | 用户名                  |
| User.avatar     | 是   | string        | 用户头像 URL            |
| User.status     | 是   | int           | 用户状态(0:正常 1:异常) |
| User.created_at | 是   | string        | 用户创建时间            |
| User.roles      | 是   | Array\<Role\> | 用户拥有的角色          |
| Roles.id        | 是   | int           | 角色 ID                 |
| Roles.role_name | 是   | string        | 角色 名称               |

## 创建用户信息

- 请求方式: `POST`
- 请求路径: `/api/users`
- 请求参数:

| 字段     | 必选 | 类型   | 说明         |
| :------- | :--- | :----- | :----------- |
| username | 是   | string | 用户名称     |
| email    | 是   | string | 用户邮箱     |
| password | 是   | string | 用户密码     |
| avatar   | 否   | string | 用户头像 URL |

- 响应示例:

```json
{
  "success": true,
  "code": 200,
  "msg": "创建成功",
  "data": null
}
```

## 修改用户信息

- 请求方式: `PATCH`
- 请求路径: `/api/users/:id`
- 请求参数:

| 字段     | 必选 | 类型   | 说明         |
| :------- | :--- | :----- | :----------- |
| username | 是   | string | 用户名称     |
| email    | 是   | string | 用户邮箱     |
| password | 是   | string | 用户密码     |
| avatar   | 否   | string | 用户头像 URL |

- 响应示例:

```json
{
  "success": true,
  "code": 200,
  "msg": "修改成功",
  "data": null
}
```

## 删除用户信息

- 请求方式: `DELETE`
- 请求路径: `/api/users/:id`
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

## 给用户分配角色

- 请求方式: `POST`
- 请求路径: `/api/userroles`
- 请求参数:

| 字段     | 必选 | 类型         | 说明         |
| :------- | :--- | :----------- | :----------- |
| user_id  | 是   | int          | 用户 ID      |
| role_ids | 是   | Array\<int\> | 角色 ID 数组 |

- 响应示例:

```json
{
  "success": true,
  "code": 200,
  "msg": "分配成功",
  "data": null
}
```
