## base URL

> http://localhost:7001

## 数据响应格式

| 字段    | 必选 | 类型   | 说明         |
| :------ | :--- | :----- | :----------- |
| success | 是   | bool   | 是否操作成功 |
| code    | 是   | int    | http 状态码  |
| msg     | 是   | string | 信息         |
| data    | 是   |        | 响应的数据   |

```json
{
  "success": true,
  "code": 200,
  "msg": "请求成功",
  "data": null
}
```

## 登录凭证

> 处理登录登录接口, 其他所有接口都需要验证登录状态

- 客户端登陆成功后, 需要将响应的数据中的 token 存入到 http header 中,字段名 `User-Token`

## 数据签名

> 所有接口的数据都必须通过接口数据签名防止数据被篡改

- 具体代码: `/client/src/api/http.js`

- 客户端将需要传递的接口参数, 通过 `jsencrypt` 生成一个签名并存入到 http header 中,字段名 `Client-Signature`

- 生成签名需要一对 RSA 1024bit 的秘钥, [在线生成](http://web.chacuo.net/netrsakeypair)
