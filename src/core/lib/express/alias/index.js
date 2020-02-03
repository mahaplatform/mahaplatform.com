const aliasMiddleware = (req, res, next) => {
  const aliases = [
    { src: '/foo', destination: '/crm/forms/w1u2ea43bp' }
  ]
  const alias = aliases.find(alias => {
    return alias.src === req.path
  })
  if(alias) {
    req.url = req.originalUrl = alias.destination

  }
  next()
}

export default aliasMiddleware
