/*
 Navicat Premium Data Transfer

 Source Server         : localhost-mysql
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 26/12/2020 01:34:05
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for permissions
-- ----------------------------
DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `desc` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '权限描述',
  `type` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '权限类型(0:路由权限 1:api权限)',
  `method` char(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '请求方式get,post等(仅api权限生效)',
  `icon` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '菜单图标(仅路由权限生效, 如果为空则不会显示在侧边栏)',
  `path` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '权限地址(type=0前端url, type=1服务端api地址)',
  `status` tinyint(1) UNSIGNED NULL DEFAULT 0 COMMENT '权限状态(0: 正常 1:锁定)',
  `pid` int(10) UNSIGNED NULL DEFAULT 0 COMMENT '路由的上级路由ID(0:表示顶级路由)',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 31 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'rbac-权限表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of permissions
-- ----------------------------
INSERT INTO `permissions` VALUES (1, '用户管理', 0, NULL, 'el-icon-user', '', 0, 0);
INSERT INTO `permissions` VALUES (2, '用户列表', 0, NULL, 'el-icon-s-operation', '/users', 0, 1);
INSERT INTO `permissions` VALUES (3, '权限管理', 0, NULL, 'el-icon-collection', NULL, 0, 0);
INSERT INTO `permissions` VALUES (4, '角色管理', 0, NULL, 'el-icon-s-custom', '/roles', 0, 3);
INSERT INTO `permissions` VALUES (5, '权限管理', 0, NULL, 'el-icon-unlock', '/permissions', 0, 3);
INSERT INTO `permissions` VALUES (6, '用户管理', 1, '', '', '', 0, 0);
INSERT INTO `permissions` VALUES (7, '用户列表', 1, 'get', '', '/api/users', 0, 6);
INSERT INTO `permissions` VALUES (8, '增加用户', 1, 'post', '', '/api/users', 0, 6);
INSERT INTO `permissions` VALUES (9, '修改用户信息', 1, 'put', '', '/api/users/:id', 0, 6);
INSERT INTO `permissions` VALUES (10, '删除用户信息', 1, 'delete', '', '/api/users/:id', 0, 6);
INSERT INTO `permissions` VALUES (12, '角色管理', 1, '', '', '', 0, 0);
INSERT INTO `permissions` VALUES (13, '获取角色列表', 1, 'get', '', '/api/roles', 0, 12);
INSERT INTO `permissions` VALUES (16, '添加角色', 1, 'post', '', '/api/roles', 0, 12);
INSERT INTO `permissions` VALUES (17, '删除角色', 1, 'delete', '', '/api/roles/:id', 0, 12);
INSERT INTO `permissions` VALUES (18, '修改角色信息', 1, 'patch', '', '/api/roles/:id', 0, 12);
INSERT INTO `permissions` VALUES (19, '权限管理', 1, '', '', '', 0, 0);
INSERT INTO `permissions` VALUES (20, '权限列表', 1, 'get', '', '/api/permissions', 0, 19);
INSERT INTO `permissions` VALUES (21, '删除权限', 1, 'delete', '', '/api/permissions/:id', 0, 19);
INSERT INTO `permissions` VALUES (22, '添加权限', 1, 'post', '', '/api/permissions', 0, 19);
INSERT INTO `permissions` VALUES (23, '修改权限信息', 1, 'patch', '', '/api/permissions/:id', 0, 19);
INSERT INTO `permissions` VALUES (29, '给角色分配权限', 1, 'post', '', '/api/roleperms', 0, 19);
INSERT INTO `permissions` VALUES (30, '给用户添加角色', 1, 'post', '', '/api/userroles', 0, 19);

-- ----------------------------
-- Table structure for role_permission
-- ----------------------------
DROP TABLE IF EXISTS `role_permission`;
CREATE TABLE `role_permission`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permission_id` int(10) UNSIGNED NOT NULL COMMENT '权限ID',
  `role_id` int(10) UNSIGNED NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `role_key`(`role_id`) USING BTREE,
  INDEX `permission_key`(`permission_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 157 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'rbac-角色权限多对多中间表' ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of role_permission
-- ----------------------------
INSERT INTO `role_permission` VALUES (148, 30, 1);
INSERT INTO `role_permission` VALUES (147, 29, 1);
INSERT INTO `role_permission` VALUES (146, 23, 1);
INSERT INTO `role_permission` VALUES (145, 22, 1);
INSERT INTO `role_permission` VALUES (144, 21, 1);
INSERT INTO `role_permission` VALUES (143, 20, 1);
INSERT INTO `role_permission` VALUES (142, 19, 1);
INSERT INTO `role_permission` VALUES (141, 18, 1);
INSERT INTO `role_permission` VALUES (140, 17, 1);
INSERT INTO `role_permission` VALUES (139, 16, 1);
INSERT INTO `role_permission` VALUES (138, 13, 1);
INSERT INTO `role_permission` VALUES (137, 12, 1);
INSERT INTO `role_permission` VALUES (136, 10, 1);
INSERT INTO `role_permission` VALUES (156, 9, 2);
INSERT INTO `role_permission` VALUES (155, 8, 2);
INSERT INTO `role_permission` VALUES (154, 7, 2);
INSERT INTO `role_permission` VALUES (153, 5, 2);
INSERT INTO `role_permission` VALUES (152, 4, 2);
INSERT INTO `role_permission` VALUES (135, 9, 1);
INSERT INTO `role_permission` VALUES (134, 8, 1);
INSERT INTO `role_permission` VALUES (133, 7, 1);
INSERT INTO `role_permission` VALUES (132, 6, 1);
INSERT INTO `role_permission` VALUES (131, 5, 1);
INSERT INTO `role_permission` VALUES (130, 4, 1);
INSERT INTO `role_permission` VALUES (129, 3, 1);
INSERT INTO `role_permission` VALUES (128, 2, 1);
INSERT INTO `role_permission` VALUES (127, 1, 1);
INSERT INTO `role_permission` VALUES (151, 3, 2);
INSERT INTO `role_permission` VALUES (150, 2, 2);
INSERT INTO `role_permission` VALUES (149, 1, 2);

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色名称',
  `role_desc` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '角色描述',
  `status` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '角色状态(0: 可用 1:不可用)',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'rbac-角色表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, '超级管理员', '拥有所有权限', 0);
INSERT INTO `roles` VALUES (2, 'admin2', '可以查看用户管理', 0);

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL COMMENT '用户ID',
  `role_id` int(11) NULL DEFAULT NULL COMMENT '角色ID',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `role_id`(`role_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 84 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'rbac-用户角色多对多中间表' ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES (83, 3, 1);
INSERT INTO `user_role` VALUES (82, 2, 2);
INSERT INTO `user_role` VALUES (81, 1, 1);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户密码',
  `email` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户邮箱',
  `created_at` datetime(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '注册时间',
  `status` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '0:正常 1:锁定',
  `avatar` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '用户头像',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'rbac-用户表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'admin', '$2b$10$RgbaCU24JbeyoRN6o7ntn.qA3Zc2o2khe6W38gYU4vwipFG37KxnG', 'admin@qq.com', '2020-12-18 07:08:56', 0, 'http://localhost:7001/public/uploads/avatar/202012/202012201926e87955ddc40c1.png');
INSERT INTO `users` VALUES (2, 'admin2', '$2b$10$q9lJwDLqPqrN76sVUx8Wl.jq/j1IWFoj3A1G55nguB8M0WvIZmfaW', 'admin2@qq.com', '2020-12-09 12:33:05', 0, 'http://localhost:7001/public/uploads/avatar/202012/20201213152aab8701f7c4b.jpg');
INSERT INTO `users` VALUES (3, 'tom', '$2b$10$LXgL4I4UwdhmapUAcHr/ceZFxcZqC01ZtFdrWktnFq6EbTmXjVXsm', 'tom@qq.com', '2020-12-09 20:11:23', 0, 'http://localhost:7001/public/uploads/avatar/202012/202012161441f34a0e5ac6e03.jpg');
INSERT INTO `users` VALUES (5, 'hello1', '$2b$10$3jdTppqRVSAxoZu8JM2SJuGGHosHBa0tFqP6tRVKkZbm1kwIhvYfu', 'hello1@qq.com', '2020-12-18 07:49:33', 0, 'http://localhost:7001/public/uploads/avatar/202012/2020121823177ab3603e5753.jpg');
INSERT INTO `users` VALUES (6, 'ceshi2', '$2b$10$o8k6miPTRs7JRinGJY73AO/0eRHnpcS05D0zqhDJQj.rXO.GQM8p.', 'ceshi2@qq.com', '2020-12-18 23:11:22', 0, '');
INSERT INTO `users` VALUES (7, 'showDocs', '$2b$10$hA1edyd6mqnQX8SIzyBpw.xGQL64FU.z/1g2QeeUzMJFXjg9dVizy', 'aaa@aaa.com', '2020-12-18 15:19:42', 0, '');
INSERT INTO `users` VALUES (8, 'aaa', '$2b$10$YkyzNXVjwI764VqVPChEDOqFOPXd8i5Qg2GR4iBfCI9MXrDiYMuwG', 'asdf@qq.com', '2020-12-21 07:05:12', 1, 'http://localhost:7001/public/uploads/avatar/202012/20201221173bddfced59897e.jpg');
INSERT INTO `users` VALUES (9, '测试1s', '$2b$10$4y.D/QJoSO5IJgLPnLF7iubq2vR4z.uuVOb5ZwicJkYr4TMbLYWoO', 'ceshi@qq.com', '2020-12-21 08:36:39', 0, '');
