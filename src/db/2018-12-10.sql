CREATE TABLE `tactions` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `desc` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '健身内容描述',
  `image` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '动作演示图片',
  `record_type` tinyint(2) NOT NULL DEFAULT '1' COMMENT '动作记录类型\n1：重量&组数\n2：持续时间',
  `part` tinyint(2) DEFAULT NULL COMMENT '部位',
  `createon` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateon` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `del` tinyint(1) NOT NULL DEFAULT '0' COMMENT '删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `ttraining_record` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `action_id` int(11) NOT NULL COMMENT '动作id',
  `weight` int(11) DEFAULT NULL COMMENT '重量（单位g）',
  `set` tinyint(2) DEFAULT NULL COMMENT '组数',
  `duration` int(11) DEFAULT NULL COMMENT '时长（一般针对有氧和耐力运动）',
  `createon` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateon` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `del` tinyint(1) NOT NULL DEFAULT '0' COMMENT '删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
