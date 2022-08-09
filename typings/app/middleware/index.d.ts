// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuth = require('../../../app/middleware/auth');
import ExportRbac = require('../../../app/middleware/rbac');
import ExportSign = require('../../../app/middleware/sign');

declare module 'egg' {
  interface IMiddleware {
    auth: typeof ExportAuth;
    rbac: typeof ExportRbac;
    sign: typeof ExportSign;
  }
}
