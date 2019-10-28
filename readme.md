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

#### 删除商品 接口

##### 请求 URL：

http://localhost:5000/manage/product/delete

##### 请求方式：

    POST

##### 参数类型

| 参数   | 是否必选 | 类型   | 说明    |
| ------ | -------- | ------ | ------- |
| \_id   | Y        | string | 商品 ID |

##### 返回示例：

     {
      "status": 0
    }

#### 代码结构调整,采用 mvc 架构
