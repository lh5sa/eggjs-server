// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportPermission = require('../../../app/model/permission');
import ExportRole = require('../../../app/model/role');
import ExportRolePermission = require('../../../app/model/rolePermission');
import ExportUser = require('../../../app/model/user');
import ExportUserRole = require('../../../app/model/userRole');

declare module 'egg' {
  interface IModel {
    Permission: ReturnType<typeof ExportPermission>;
    Role: ReturnType<typeof ExportRole>;
    RolePermission: ReturnType<typeof ExportRolePermission>;
    User: ReturnType<typeof ExportUser>;
    UserRole: ReturnType<typeof ExportUserRole>;
  }
}
