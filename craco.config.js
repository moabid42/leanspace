module.exports = {
  plugins: [
    {
      plugin: require("craco-cesium")(),
    },
  ],
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      });
      return webpackConfig;
    },
  },
};
