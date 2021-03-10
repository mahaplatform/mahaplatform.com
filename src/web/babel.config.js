const path = require('path')

module.exports = {
  env: {
    development : {
      compact: false
    }
  },
  presets: [
    'next/babel'
  ],
  plugins: [
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-class-properties',
    ['module-resolver', {
      alias: {
        '@client': path.resolve('src','lib','client')
      }
    }]
  ]
}
