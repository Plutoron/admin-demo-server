create database test;

-- 公司
create table info
(
  id int primary key AUTO_INCREMENT,
  name varchar(255) not null,
  logo varchar(255) not null,
  phone varchar(255) not null,
  fax varchar(255) not null,
  qrcode varchar(255) not null,
  address varchar(255),
);

-- 荣誉
CREATE TABLE honor
(
  id int identity(1,1) primary key,
  title varchar(255),
  url varchar(255),
);

-- 解决方案
CREATE TABLE solution
(
  id int identity(1,1) primary key,
  title varchar(255),
  type varchar(255),
  url varchar(255),
);