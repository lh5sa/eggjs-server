'use strict';

// !!解决 JSEncrypt 报错: 必须在 require JSEncrypt 之前执行
global.window = {};
global.navigator = { appName: 'node.js' };
const JSEncrypt = require('jsencrypt');
const { SHA256 } = require('crypto-js');

/**
 * 数据签名验证中间件
 */
module.exports = () => async (ctx, next) => {
  const sign = ctx.request.headers['client-signature'];
  const msg = '禁止访问: 数据签名有误可能被篡改';
  if (!sign) {
    ctx.error(403, msg);
    return;
  }

  // 获取数据
  const { path, origin, body, method } = ctx.request;
  const args = {
    url: `${origin}${path}`,
    method: method.toLowerCase(),
  };
  if (args.method === 'get' && Object.keys(ctx.query).length) {
    args.params = ctx.query;
  }
  if (Object.keys(body).length) {
    args.data = body;
  }

  // 验证签名
  // !! 注意: publicKey 必须和客户端生成签名的私钥是一对
  const jsencrypt = new JSEncrypt();
  const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDA/SVT71FB1DABDW41oq6I7vBa
9IcFNuEKnIVcLTZmnGfj5hx5Z1f1IkKdNj1YYFhMh5PxsYREd+uUHVwljDR9ZnPx
cy0PNyMGaUiwkYBfrJ7W2K/BhJiYXsKcFjJt5/ZNc4V3I6hO5hvw0LNaa2La4p9z
gXCiI6ytT4k5e1shoQIDAQAB
-----END PUBLIC KEY-----`;
  jsencrypt.setPublicKey(publicKey);
  if (!jsencrypt.verify(JSON.stringify(args), sign, SHA256)) {
    return ctx.error(403, msg + JSON.stringify(args));
  }

  await next();
};
