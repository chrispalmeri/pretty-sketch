// rollup.config.js
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/js/index.js',
  output: {
    file: 'build/js/bundle.js',
    format: 'cjs'
  },
  plugins: [
    copy({
      'src/index.htm': 'build/index.htm'
    })
  ]
};