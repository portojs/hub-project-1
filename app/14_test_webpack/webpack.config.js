/**
 * Created by Peter on 12.02.2016.
 */
module.exports = {
  entry: './js/entry.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'}
    ]
  }
};