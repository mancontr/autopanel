import babel from 'rollup-plugin-babel'
import sass from 'rollup-plugin-sass';
import json from 'rollup-plugin-json';

export default [
  {
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
      'react-quill',
      'query-string',
      'quill',
      'quill-delta-to-html'
    ]
  }, {
    input: 'src/routes/v4.js',
    plugins: [ babel({ exclude: 'node_modules/**' }) ],
    output: [
      {
        file: 'dist/routes/v4.js',
        format: 'cjs'
      },
      {
        file: 'dist/routes/v4.es6',
        format: 'esm'
      }
    ],
    external: [
      'prop-types',
      'react',
      'react-router-dom',
      'autopanel'
    ]
  }, {
    input: 'src/routes/v3.js',
    plugins: [ babel({ exclude: 'node_modules/**' }) ],
    output: [
      {
        file: 'dist/routes/v3.js',
        format: 'cjs'
      },
      {
        file: 'dist/routes/v3.es6',
        format: 'esm'
      }
    ],
    external: [
      'prop-types',
      'react',
      'react-router',
      'autopanel'
    ]
  }
]
