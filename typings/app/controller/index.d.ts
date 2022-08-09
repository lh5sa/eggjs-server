// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAssign = require('../../../app/controller/assign');
import ExportPermission = require('../../../app/controller/permission');
import ExportRole = require('../../../app/controller/role');
import ExportUpload = require('../../../app/controller/upload');
import ExportUser = require('../../../app/controller/user');

declare module 'egg' {
  interface IController {
    assign: ExportAssign;
    permission: ExportPermission;
    role: ExportRole;
    upload: ExportUpload;
    user: ExportUser;
  }
}
