const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  productionSourceMap:false,
  transpileDependencies: true,
  pages: {
    index: {
      entry: "./src/main.js",
      title: "demo",
    },
  },
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
});
