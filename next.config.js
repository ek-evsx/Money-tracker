// eslint-disable-next-line
const withAntdLess = require('next-plugin-antd-less');

// eslint-disable-next-line
module.exports = withAntdLess({
  lessVarsFilePath: './styles/variables.less',
  lessVarsFilePathAppendToEndOfContent: false,
  cssLoaderOptions: {
    loader: 'less-loader',
    options: { javascriptEnabled: true },
  },
  webpack(config) {
    return config;
  },

  future: {
    webpack5: true,
  },
});
