create database test;

-- about
create table about
(
  id int primary key AUTO_INCREMENT,
  name varchar(255),
  logo varchar(255),
  phone varchar(255),
  fax varchar(255),
  mail varchar(255),
  qrcode varchar(255),
  address varchar(255),
  intro varchar(255),
  orgImg varchar(255),
  fillinfo varchar(255),
  ctime TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  mtime TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 向数据库添加字段
-- ALTER TABLE student ADD ctime TIMESTAMP;
-- ALTER TABLE student ADD mtime TIMESTAMP;
-- ALTER TABLE student ADD mtime TIMESTAMP first; 

-- ALTER TABLE about ADD COLUMN  mail varchar(255) not null COMMENT '邮箱' after fax;
-- 更新字段
-- ALTER TABLE `table_name` ADD COLUMN  `CreateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间';
-- ALTER TABLE info ADD COLUMN  intro varchar(255) not null COMMENT '公司简介' after address;
-- ALTER TABLE info ADD COLUMN  orgImg varchar(255) not null COMMENT '组织结构图片' after intro;
-- ALTER TABLE `info` MODIFY COLUMN `ctime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间';
-- ALTER TABLE `info` MODIFY COLUMN `mtime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间';


LONGTEXT

ALTER TABLE `hire` MODIFY COLUMN `html` LONGTEXT NULL COMMENT '富文本';

-- init 数据
insert into about 
(name, logo, phone, fax, qrcode, address, intro, orgImg) 
values 
("上海", "logo", "110", "fax110", "qrcode", "地址", '简介', '组织图片');

update info set logo="sssss" where name="上海";

-- 荣誉
CREATE TABLE honor
(
  id int key AUTO_INCREMENT,
  title varchar(255),
  img varchar(255),
  valid tinyint(1) null DEFAULT 1 COMMENT '是否有效',
  ctime TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  mtime TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 解决方案
CREATE TABLE solution
(
  id int key AUTO_INCREMENT,
  title varchar(255),
  type varchar(255) check(type in ('build', 'manage', 'protect')),
  img varchar(255),
  valid tinyint(1) null DEFAULT 1 COMMENT '是否有效',
  ctime TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  mtime TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 招聘

CREATE TABLE hire
(
  id int key AUTO_INCREMENT,
  html LONGTEXT,
  ctime TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  mtime TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE culture
(
  id int key AUTO_INCREMENT,
  html LONGTEXT,
  ctime TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  mtime TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE news
(
  id int key AUTO_INCREMENT,
  title varchar(255),
  subtitle varchar(255),
  poster varchar(255),
  time TIMESTAMP,
  html LONGTEXT,
  valid tinyint(1) null DEFAULT 1 COMMENT '是否有效',
  ctime TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  mtime TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE news ADD COLUMN valid tinyint(1) null DEFAULT 1 COMMENT '是否有效' after html;
ALTER TABLE solution ADD COLUMN valid tinyint(1) null DEFAULT 1 COMMENT '是否有效' after img;
ALTER TABLE honor ADD COLUMN valid tinyint(1) null DEFAULT 1 COMMENT '是否有效' after img;

ALTER TABLE about ADD COLUMN fillinfo varchar(255) null COMMENT '备案信息' after orgImg;


text

ALTER TABLE `news` MODIFY COLUMN `html` LONGTEXT;
ALTER TABLE `culture` MODIFY COLUMN `html` LONGTEXT;
ALTER TABLE `hire` MODIFY COLUMN `html` LONGTEXT;