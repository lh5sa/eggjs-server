/* eslint valid-jsdoc: "off" */

'use strict';

const db = require('./database');
const onerror = require('./onerror');
const cors = require('./cors');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + 'app_key_secret';

  // add your middleware config here
  config.middleware = [];

  // 数据库链接
  config.sequelize = db;

  // 不开启 csrf 验证
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // 允许跨域
  config.cors = cors;

  // 文件上传配置
  config.multipart = {
    fileSize: '2mb',
    whitelist: ['.jpg', '.jpeg', '.png', '.gif'],
  };

  // 异常处理
  config.onerror = onerror;

  // 自定义配置
  const userConfig = {
    // myAppName: 'egg',
  };

  return { ...config, ...userConfig };
};
