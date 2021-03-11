import path from 'path'

export default (root) => ({
  presets: [
    ['@babel/preset-env', {
      targets: 'defaults',
      useBuiltIns: 'entry',
      corejs: 3.8
    }],
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-class-properties',
    ['module-resolver', {
      alias: {
        '@apps': path.resolve(root,'apps'),
        '@core': path.resolve(root,'core'),
        '@web': path.resolve(root,'web')
      }
    }]
  ]
})
