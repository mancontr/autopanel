import babel from 'rollup-plugin-babel'
import sass from 'rollup-plugin-sass';
import json from 'rollup-plugin-json';

export default {
  input: 'src/index.js',
  plugins: [
    babel({ exclude: 'node_modules/**' }),
    sass({ output: true }),
    json({})
  ],
  output: [
    {
      file: 'dist/bundle.js',
      format: 'cjs'
    },
    {
      file: 'dist/bundle.es6',
      format: 'esm'
    }
  ],
  external: [
    'prop-types',
    'react',
    'react-intl',
    'query-string'
  ]
}
