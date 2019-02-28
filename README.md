# FitNote Server

## 项目启动

启动: `node src/index.js`

## 使用库

- Eslint ([eslint-config-koa](https://github.com/koajs/eslint-config-koa))
- MySQL (本地数据库版本`Mysql 5.7.10`)
- koa/cors
- bluebird
- glob
- jsonwebtoken
- koa-bodyparser
- koa-router
- koa-static
- lodash
- log4js

## 项目结构说明

```
├── config                     # 项目配置目录
│   └── config_template.js
├── package.json
├── src
│   ├── db                     # db文件存放目录
│   ├── index.js               # 项目起始文件
│   ├── middleware             # 中间件目录
│   │   ├── AccessLogger.js    # 访问记录
│   │   ├── DecodeToken.js     # 解码jwt token
│   │   ├── ErrorHandler.js    # 统一错误处理
│   │   └── ResponseTime.js    # 响应时间处理
│   ├── module                 # 模块
│   │   ├── index.js           # 统一处理模块路由
│   └── util                   # 工具目录
│       ├── BaseDao.js         # sql base，module中的模块继承
│       ├── BaseRouter.js      # 处理module中模块的路由
│       ├── const.js           # 常量
│       ├── db.js              # sql库
│       ├── jwt.js             # json web token
│       ├── logger.js          # log4js
│       └── messageBean.js     # 处理请求返回
```

## 特性

采用Koa.js数据库使用MySQL 5.7，对框架数据处理层——dao层进行封装，使用继承来模块化Module等等，很大程度上提升系统易用性与安全性。

**特性：**

模块化业务层。（每个Module独立Router路由层、Dao数据层、Controller控制层）
抽象Middleware层，每个模块可以更方便的组合自己需要的中间件。
统一错误捕获与处理。
统一解码jwt。
封装消息处理，统一管理API消息。
记录访问。

**安全策略：**

采用JWT（Json Web Token）来做接口安全检查，并封装权限效验中间件。
封装数据库类，统一处理数据库层面可能发生的安全问题。
记录每一次的API进/出，可以更具需要处理与分析风险。
使用log4js记录、管理系统日志。
