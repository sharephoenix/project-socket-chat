create database USER;
drop table user;
drop table login_db;

create table user {
  id varchar(255) comment '用户唯一id',
  nickname varchar(255) comment '用户昵称',
  realname varchar(255) comment '用户真实姓名',
  phonenumber varchar(255),
  qq varchar(255) comment '用户 qq',
  hometown varchar(255) comment '用户家乡',
  sex int comment '用户性别 0: 未知 1: 男 2: 女',
  register int comment '该用户状态 0: 注销 1: 正常'
};

create table login_db {
  id varchar(255) comment '用户唯一id',
  token varchar(255) comment '用户登录 token',
  secrect varchar(255)
};