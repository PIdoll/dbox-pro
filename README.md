# dbox-pro
基于dbox-ui的脚手架

### 开始使用

```bash
git clone https://github.com/PIdoll/dbox-pro.git
cd dbox-pro
npm install 
npm run start 
```


### 目录结构

```
   |
   ├──mock/                      * mock数据配置
   |
   ├──src/                       * 主程序
   │   │
   │   │──api                    * 后端接口配置
   │   │
   │   └──assets                 * 所有静态资源
   │   │
   │   └──components             * 所有组件
   │   │
   │   └──page                   * 所有页面
   │   │
   │   └──style                  * 所有样式变量集中管
   │   │
   │   └──utils                  * 封装的工具
   │   │
   │   └──index.js               * 页面总入口
   │   │
   │   └──index.less             * 页面总样式
   │   │
   │   └──Routers.jsx            * 页面路由配置
   │
   │──.babelrc                   * Babel配置
   │
   │──dbox.html                  * 打包的页面模版
   │
   │──devServer.js               * mock数据
   │
   │──index.html                 * 项目启动页面模版
   │
   │──package.json               * 包信息
   │
   │──webpack.common.js          * webpack公共配置
   │
   │──webpack.dev.js             * 项目本地启动webpack配置
   │
   │──webpack.dll.config.js      * 项目依赖包webpack配置
   │
   └──webpack.prod.js            * 项目打包webpack配置
```

















