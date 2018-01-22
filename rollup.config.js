// rollup.config.js
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/js/main.js',
  output: {
    file: 'dist/js/bundle.js',
    format: 'cjs'
  },
  plugins: [
    copy({
      'src/index.html': 'dist/index.html',
      'src/css/main.css': 'dist/css/bundle.css'
    })
  ]
};