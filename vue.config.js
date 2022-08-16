const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  productionSourceMap: false,
  transpileDependencies: true,
  pages: {
    index: {
      entry: "./src/main.js",
      title: "在线群聊",
    },
  },
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
});
