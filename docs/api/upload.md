# 上传头像

- 请求方式: `POST`
- 请求路径: `/api/upload/avatar`
- 请求参数:

| 字段 | 必选 | 类型 | 说明   |
| :--- | :--- | :--- | :----- |
| file | 是   | File | 文件流 |

```json
{
  "success": true,
  "code": 200,
  "msg": "请求成功",
  "data": {
    "url": "http://localhost:7001/public/avatar/202012/sdfa1.jpg"
  }
}
```

- 响应数据说明:

| 字段 | 必选 | 类型   | 说明                 |
| :--- | :--- | :----- | :------------------- |
| url  | 是   | string | 文件上传成功后的 url |
