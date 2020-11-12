module.exports = {
  distDir: 'dist',
  async rewrites() {
    return [
      { source: '/foo', destination: '/1' },
      { source: '/foobar', destination: '/1' },
      { source: '/bar', destination: '/2' },
      { source: '/baz', destination: '/3' }
    ]
  },
  target: 'server'
}
