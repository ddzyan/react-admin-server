## 简介

react-admin 后端服务代码，前端代码仓库在：https://github.com/ddzyan/react-demo/tree/master/react-admin

### 使用

首先修改 server.js 代码中的 mongoDB 服务器 IP 地址

```js
connect(
  "mongodb://111.231.215.55/server_db2",
  { useNewUrlParser: true }
);
```

```shell
npm install

npm start
```

### 更新记录

- 添加前端代码到 public 静态文件目录中，避免出现跨域问题
- 完成基础代码，实现前端 api
