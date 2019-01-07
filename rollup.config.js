import babel from 'rollup-plugin-babel'
import sass from 'rollup-plugin-sass';

export default {
  input: 'src/index.js',
  plugins: [
    babel({ exclude: 'node_modules/**' }),
    sass({ output: true })
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
    'react-router',
    'query-string'
  ]
}
