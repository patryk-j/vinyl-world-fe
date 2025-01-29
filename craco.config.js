const CracoLessPlugin = require("craco-less");
const VeauryVuePlugin = require("veaury/webpack/VeauryVuePlugin");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#0052a5",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        vue: "vue/dist/vue.runtime.esm-bundler.js",
        "vue-router": "vue-router/dist/vue-router.esm-bundler.js",
      };

      webpackConfig.plugins.push(
        new VeauryVuePlugin({
          babelLoader: {
            include(filename) {
              if (filename.match(/[/\\]node_modules[\\/$]+/)) return;
              if (filename.match(/\.(vue|vue\.js)$/i)) {
                return filename;
              }
              if (filename.match(/[/\\]abc[\\/$]+/)) return filename;
            },
          },
        })
      );

      return webpackConfig;
    },
  },
};
