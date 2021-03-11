const path = require('path')

module.exports = (root) => ({
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
        '@admin': path.resolve(root,'lib','admin'),
        '@analytics': path.resolve(root,'analytics'),
        '@apps': path.resolve(root,'apps'),
        '@core': path.resolve(root,'core'),
        '@client': path.resolve(root,'lib','client'),
        '@public': path.resolve(root,'lib','public'),
        '@web': path.resolve(root,'web')
      }
    }]
  ],
  sourceMaps: 'inline'
})
