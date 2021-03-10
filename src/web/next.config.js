module.exports = {
  basePath: '/sites',
  rewrites: async () => [
    { source: '/:code/:permalink*', destination: '/page?code=:code&permalink=:permalink*'}
  ]
}
