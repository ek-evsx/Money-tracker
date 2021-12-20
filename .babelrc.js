module.exports = {
    presets: [['next/babel']],
    plugins: [['import', { libraryName: 'antd', style: true }]],
    loader: 'less-loader', options: { javascriptEnabled: true },
};