const path = require('path')

module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
    'transform-promise-to-bluebird',
    ['module-resolver', {
      alias: {
        '@admin': path.resolve('.src/lib/admin'),
        '@analytics': path.resolve('.src/analytics'),
        '@apps': path.resolve('.src/apps'),
        '@core': path.resolve('.src/core'),
        '@client': path.resolve('.src/lib/client'),
        '@public': path.resolve('.src/lib/public')
      }
    }]
  ]
}
