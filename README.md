# dbox-pro

基于dbox-ui的脚手架

### 开始使用

```bash
git clone https://github.com/PIdoll/dbox-pro.git
cd dbox-pro
npm install
npm run dll # 编译dll(只需要编译一次)
npm run start
```

### 规范

* 工具主要使用 [eslint](https://eslint.org/)，js规范检查，快速修复格式问题
  `eslint --fix src`
* 采用两格缩进,请将vscode的tab设置成2，并且在配置中加
  
  ```js
    "editor.detectIndentation": false,
    "editor.renderControlCharacters": true,
    "editor.renderWhitespace": "all"
  ```

  格式化请按快捷键 **alt+shift+f**

* 文件夹: 小写 中划线 eg: tools-bar、navigation-bar

* 文　件: 小写 中划线 eg: chat-box-container.js

* 内　容: class 大驼峰, eg: TestComponent

* 注　释:
	方法前注释: /* note something */
	函数内注释: // note something
	vscode安装插件: Document this

### 代码格式化说明

> 项目提交代码前会调用 prettier 进行变动文件的格式化

```bash
# 需要对项目指定文件或文件夹格式化
yarn prettier --write src/**/*.js  # src指定目录，*.js指定类型
```

```bash
# 如需自动美化，安装 prettier 插件，并在当前项目中添加 settings.json，追加内容
{
  "editor.formatOnSave": false,
  "[javascript]": {
    "editor.formatOnSave": true
  }
}
```

### 目录结构

```bash
   |
   ├──mock/                      * mock 数据配置
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
   │   └──style                  * 所有样式变量集中管理
   │   │
   │   └──utils                  * 封装的工具
   │   │
   │   └──App.jsx                * 应用入口
   │   │
   │   └──index.js               * 项目入口
   │   │
   │   └──index.less             * 项目整体样式
   │
   │──.babelrc                   * Babel 配置
   │
   │──dbox.html                  * 生产环境页面模版
   │
   │──devServer.js               * mock 数据
   │
   │──index.html                 * 开发环境页面模版
   │
   │──package.json               * 包信息
   │
   │──webpack.common.js          * webpack 公共配置
   │
   │──webpack.dev.js             * 开发环境启动 webpack 配置
   │
   │──webpack.dll.config.js      * 项目依赖包 webpack 配置
   │
   └──webpack.prod.js            * 生产环境 webpack 配置
```

















