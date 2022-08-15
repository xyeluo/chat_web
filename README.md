# 简易多人聊天

## 描述

> Vue2+node+axios

> 聊天记录储存在文件

> 通请求的路径获取对应的用户名 无密码

> 使用axios轮询获取用户聊天信息

> 显示在线用户

![](https://img-blog.csdnimg.cn/eeaf9fbfe64541e5878469870ca05f0b.png)

## 修改文件说明

#### 后台入口文件：chatting.js

```
6~7行修改后台服务器地址和端口
8行聊天记录储存文件：./user/demo.txt
```

#### 用户文件User.json

```
例：
{
  "user_1001": {      //请求路径，当前用户请求路径为：http://ip:端口/user_1001/
    "name": "test_user01",       //对应的用户名
    "avtar": "avtars/user01.jpg" //用户头像路径
  },
}
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
默认三个用户的请求路径分别为（路径末尾要加斜杠！）：
http://127.0.0.1:15672/user_1001/
http://127.0.0.1:15672/user_1002/
http://127.0.0.1:15672/user_1003/
```