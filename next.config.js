const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
  lessVarsFilePath: './styles/variables.less',
  lessVarsFilePathAppendToEndOfContent: false,
  cssLoaderOptions: {
    loader: 'less-loader', options: { javascriptEnabled: true },
  },
  webpack(config) {
    return config;
  },

  future: {
    webpack5: true,
  },
});