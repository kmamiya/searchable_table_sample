module.exports = {
  entry: './index.js',
  output: {
    filename: './bundle.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '.',
    host: '0.0.0.0',
    port: 8080,
  }
};
