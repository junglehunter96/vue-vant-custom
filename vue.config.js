const webpackConfig = require("./config/webpack.config.js");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const isProd = process.env.NODE_ENV === "production";
const path = require("path");
// 开发模式代理地址 TODO: 按需修改
const DEV_URL = " 192.168.1.140";

// mock模式代理地址,为了方便演示，这里使用了fastmock线上服务，建议使用yapi,可以搭建私服， TODO: 按需修改
const MOCK_URL =
  "https://www.fastmock.site/mock/5446243ef80765d1fa72d818343131e7/base";
const resolve = (dir) => {
  return path.join(__dirname, dir);
};
module.exports = {
  // 不需要生产环境的 source map
  productionSourceMap: false,
  publicPath: !isProd ? "/" : "",
  configureWebpack: (config) => {
    if (isProd) {
      // 配置webpack 压缩
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: /\.js$|\.html$|\.css$/,
          // 超过4kb压缩
          threshold: 4096,
        })
      );
    }
  },
  chainWebpack: (config) => {
    // 项目标题
    config.plugin("html").tap((args) => {
      args[0].title = "baseCli";
      return args;
    });
    webpackConfig(config);
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src")) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set("@img", resolve("src/assets/img"))
      .set("@c", resolve("src/components"))
      .set("@styles", resolve("src/styles"))
      .set("@utils", resolve("src/utils"))
      .set("@request", resolve("src/request"));

    const oneOfsMap = config.module.rule("scss").oneOfs.store;
    oneOfsMap.forEach((item) => {
      item
        .use("sass-resources-loader")
        .loader("sass-resources-loader")
        .options({
          // Provide path to the file with resources
          resources: "./src/styles/scss/resources.scss",
        })
        .end();
    });
  },
  css: {
    // 是否将css 提取到独立的文件,生产环境提取，开发环境不提取
    extract: !!isProd,
    // 开发模式开启css sourcemap
    sourceMap: !isProd,
    loaderOptions: {
      less: {
        // 若使用 less-loader@5，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            "text-color": "#333",
            "border-color": "#eee",
            "active-color": "#f2f3f5",
          },
        },
      },
    },
  },
  devServer: {
    port: 12315,
    proxy: {
      "^/api": {
        target: DEV_URL,
        changeOrigin: false,
        pathRewrite: {
          "^/api": "",
        },
      },
      "^/mock/": {
        // TODO: 添加 mock地址
        target: MOCK_URL,
        changeOrigin: false,
        pathRewrite: {
          "^/mock": "",
        },
      },
    },
  },
};
