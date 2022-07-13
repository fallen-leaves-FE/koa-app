# Koa2.0 + TS + EJS + Rollup实现SSR

## 功能介绍
- rollup模块化打包
- typescript
- ejs模板引擎
- esbuild打包编译
- eslint代码规范检查
- sass，postcss预处理

## 开发指南
```
# 安装cli

npm install -g wecoder-cli

# 初始化项目

wecoder init <project-name>

# 1.项目基本配置
# 2.选择基于rollup的vue3.0组件库模板
# 3.等待初始化完成
cd <project-name>
```
### 安装依赖
	npm install
### 本地开发
	npm run dev
	npm run serve
### 生产部署
	# npm stop
	npm run build
	npm start

## 目录解析
```
app/ ---------------------------服务应用根目录
 --controllers/ -----------------控制器目录
 --service/ ---------------------服务目录
 --views/ -----------------------打包后的模板文件及静态资源
 --router.ts --------------------路由
 --app.ts -----------------------服务入口文件
src/ ---------------------------视图源码
 --template/ --------------------页面模板文件目录
 --scripts/ ---------------------页面脚本
 --assets/ ----------------------页面静态资源
pages.js -------------------------页面入口配置
rollup.config.js ------------------rollup打包配置
ecosystem.config.js ---------------pm2配置文件
...
```
