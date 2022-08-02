# ~~Chat_web_simple~~

**已改成简易多人聊天，文档尚未更新！(2022/8/2)**

## 描述

> Vue+node 聊天记录储存在文件 通过请求的路径获取对应的用户名 无密码

## 修改文件说明

#### node入口文件：chatting.js

```
后台端口在7行，默认为80
11~14设置账号 账号的属性名为请求的路径
更改属性名后要清除储存文件
聊天记录储存文件：./user/demo.txt
```

#### vue文件

```
修改后台请求地址
src\components\InputBox.vue 44行 `服务器地址+chatting设置的端口${window.location.pathname}`
src\App.vue  29行 `服务器地址+chatting设置的端口${window.location.pathname}`
```

## 运行

```
当前路径应在chat_web文件夹下
npm install
node chating.js
npm run serve //默认8080端口
```

## 访问

```
请求路径为服务器地址/账号属性名
默认为http://192.168.31.180:8080/user_1001/ 末尾要有斜杠
or http://192.168.31.180:8080/user_1002/
```