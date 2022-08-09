-- # ************************************************************
-- # Sequel Ace SQL dump
-- # Version 20033
-- #
-- # https://sequel-ace.com/
-- # https://github.com/Sequel-Ace/Sequel-Ace
-- #
-- # Host: liaohui5.cn (MySQL 5.7.35)
-- # Database: simple_admin
-- # Generation Time: 2022-08-09 09:28:13 +0000
-- # ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- # Dump of table permissions
-- # ------------------------------------------------------------

DROP TABLE IF EXISTS `permissions`;

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `desc` varchar(64) NOT NULL DEFAULT '' COMMENT '权限描述',
  `type` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '权限类型(0:路由权限 1:api权限)',
  `method` char(8) DEFAULT NULL COMMENT '请求方式get,post等(仅api权限生效)',
  `icon` varchar(32) DEFAULT '' COMMENT '菜单图标(仅路由权限生效, 如果为空则不会显示在侧边栏)',
  `path` varchar(32) DEFAULT NULL COMMENT '权限地址(type=0前端url, type=1服务端api地址)',
  `status` tinyint(1) unsigned DEFAULT '0' COMMENT '权限状态(0: 正常 1:锁定)',
  `pid` int(10) unsigned DEFAULT '0' COMMENT '路由的上级路由ID(0:表示顶级路由)',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='rbac-权限表';

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;

INSERT INTO `permissions` (`id`, `desc`, `type`, `method`, `icon`, `path`, `status`, `pid`)
VALUES
	(1,'用户管理',0,NULL,'fa-users','/',0,0),
	(2,'用户列表',0,NULL,'fa-user','/users',0,1),
	(3,'权限管理',0,NULL,'fa-get-pocket','/',0,0),
	(4,'角色管理',0,NULL,'fa-id-card','/roles',0,3),
	(5,'权限管理',0,NULL,'fa-unlock','/permissions',0,3),
	(6,'用户管理',1,'','','',0,0),
	(7,'用户列表',1,'get','','/api/users',0,6),
	(8,'增加用户',1,'post','','/api/users',0,6),
	(9,'修改用户信息',1,'put','','/api/users/:id',0,6),
	(10,'删除用户信息',1,'delete','','/api/users/:id',0,6),
	(12,'角色管理',1,'','','',0,0),
	(13,'获取角色列表',1,'get','','/api/roles',0,12),
	(16,'添加角色',1,'post','','/api/roles',0,12),
	(17,'删除角色',1,'delete','','/api/roles/:id',0,12),
	(18,'修改角色信息',1,'patch','','/api/roles/:id',0,12),
	(19,'权限管理',1,'','','',0,0),
	(20,'权限列表',1,'get','','/api/permissions',0,19),
	(21,'删除权限',1,'delete','','/api/permissions/:id',0,19),
	(22,'添加权限',1,'post','','/api/permissions',0,19),
	(23,'修改权限信息',1,'patch','','/api/permissions/:id',0,19),
	(29,'给角色分配权限',1,'post','','/api/roleperms',0,19),
	(30,'给用户添加角色',1,'post','','/api/userroles',0,19);

/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;


-- # Dump of table role_permission
-- # ------------------------------------------------------------

DROP TABLE IF EXISTS `role_permission`;

CREATE TABLE `role_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permission_id` int(10) unsigned NOT NULL COMMENT '权限ID',
  `role_id` int(10) unsigned NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `role_key` (`role_id`) USING BTREE,
  KEY `permission_key` (`permission_id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 ROW_FORMAT=FIXED COMMENT='rbac-角色权限多对多中间表';

LOCK TABLES `role_permission` WRITE;
/*!40000 ALTER TABLE `role_permission` DISABLE KEYS */;

INSERT INTO `role_permission` (`id`, `permission_id`, `role_id`)
VALUES
	(148,30,1),
	(147,29,1),
	(146,23,1),
	(145,22,1),
	(144,21,1),
	(143,20,1),
	(142,19,1),
	(141,18,1),
	(140,17,1),
	(139,16,1),
	(138,13,1),
	(137,12,1),
	(136,10,1),
	(156,9,2),
	(155,8,2),
	(154,7,2),
	(153,5,2),
	(152,4,2),
	(135,9,1),
	(134,8,1),
	(133,7,1),
	(132,6,1),
	(131,5,1),
	(130,4,1),
	(129,3,1),
	(128,2,1),
	(127,1,1),
	(151,3,2),
	(150,2,2),
	(149,1,2);

/*!40000 ALTER TABLE `role_permission` ENABLE KEYS */;
UNLOCK TABLES;


-- # Dump of table roles
-- # ------------------------------------------------------------

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(32) NOT NULL COMMENT '角色名称',
  `role_desc` varchar(128) DEFAULT NULL COMMENT '角色描述',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '角色状态(0: 可用 1:不可用)',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='rbac-角色表';

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;

INSERT INTO `roles` (`id`, `role_name`, `role_desc`, `status`)
VALUES
	(1,'超级管理员','拥有所有权限',0),
	(2,'admin2','可以查看用户管理',0);

/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;


-- # Dump of table user_role
-- # ------------------------------------------------------------

DROP TABLE IF EXISTS `user_role`;

CREATE TABLE `user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL COMMENT '用户ID',
  `role_id` int(11) DEFAULT NULL COMMENT '角色ID',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE,
  KEY `role_id` (`role_id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 ROW_FORMAT=FIXED COMMENT='rbac-用户角色多对多中间表';

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;

INSERT INTO `user_role` (`id`, `user_id`, `role_id`)
VALUES
	(83,3,1),
	(84,2,2),
	(90,1,2),
	(85,2,1),
	(89,1,1),
	(91,5,2);

/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;


-- # Dump of table users
-- # ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL COMMENT '用户名',
  `password` varchar(255) DEFAULT NULL COMMENT '用户密码',
  `email` varchar(64) NOT NULL COMMENT '用户邮箱',
  `created_at` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '注册时间',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '0:正常 1:锁定',
  `avatar` varchar(128) DEFAULT '' COMMENT '用户头像',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='rbac-用户表';

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `username`, `password`, `email`, `created_at`, `status`, `avatar`)
VALUES
	(1,'admin','$2b$10$RgbaCU24JbeyoRN6o7ntn.qA3Zc2o2khe6W38gYU4vwipFG37KxnG','admin@qq.com','2022-08-09 09:05:18',0,''),
	(2,'admin222','$2b$10$q9lJwDLqPqrN76sVUx8Wl.jq/j1IWFoj3A1G55nguB8M0WvIZmfaW','admin2@qq.com','2022-08-09 09:02:47',0,''),
	(3,'__tom__','$2b$10$LXgL4I4UwdhmapUAcHr/ceZFxcZqC01ZtFdrWktnFq6EbTmXjVXsm','tom@qq.com','2022-08-09 09:02:37',0,''),
	(5,'hello1','$2b$10$3jdTppqRVSAxoZu8JM2SJuGGHosHBa0tFqP6tRVKkZbm1kwIhvYfu','hello1@qq.com','2022-08-09 09:05:18',0,''),
	(6,'ceshi2','$2b$10$o8k6miPTRs7JRinGJY73AO/0eRHnpcS05D0zqhDJQj.rXO.GQM8p.','ceshi2@qq.com','2022-08-09 09:02:52',0,''),
	(7,'showDocs','$2b$10$hA1edyd6mqnQX8SIzyBpw.xGQL64FU.z/1g2QeeUzMJFXjg9dVizy','aaa@aaa.com','2022-08-09 09:05:18',0,''),
	(8,'aaa','$2b$10$YkyzNXVjwI764VqVPChEDOqFOPXd8i5Qg2GR4iBfCI9MXrDiYMuwG','asdf@qq.com','2022-08-09 09:05:18',1,''),
	(9,'测试1s','$2b$10$4y.D/QJoSO5IJgLPnLF7iubq2vR4z.uuVOb5ZwicJkYr4TMbLYWoO','ceshi@qq.com','2022-08-09 09:05:18',0,''),
	(10,'测试2','$2a$10$PPtcVN6uHUwzpcfJzL2ClecQ.LbdgsrN/mH0XJnB55Cg0JWyAc6E.','hello@qq.com','2022-06-24 14:47:57',0,''),
	(11,'abc','$2a$10$RqTPPedimkM2EWZTE4ZWHOx1mYgyCVbkEAQdRinrA.ZUPL2pcLWKC','abc@qq.com','2022-06-24 14:50:00',0,''),
	(12,'admin123','$2a$10$4jOUG90ZHsV5FMqMiI5.BOGPYE4WpaX6ncmbobrr7ydXVHunnSdja','admin123@qq.com','2022-06-24 16:03:17',0,'');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
