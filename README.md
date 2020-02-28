# Bootstrap4 学习

## 代码介绍

本来是一个学习 Bootstrap4 的代码库。  
现在加入 Github Webhooks, 可以自动部署了。

## 基本结构

```
leke-bootstrap-4 /
├── .gitignore
├── app.js
├── deplpy.sh
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── scripts.js
├── style.css
├── yarn.lock
```

> app.js 为 Webhooks 入口文件，GitHub 监视文件  
> deploy.sh 为 git pull 实行文件

## 步骤

- yarn 创建项目
- 创建 deploy.sh
- node 创建 Webhooks
- 配置 Github 的 Webhooks
- app.js pm2 自动运行
