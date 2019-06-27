const preconditions = (req, res, next) => {
  const requestURI = req.originalUrl.replace(`/admin/drive/${req.params.subdomain}`, '')
  const slashfree = requestURI.replace(/\/+$/, '').replace(/^\/+/, '')
  req.fullpath = decodeURI(slashfree)
  req.label = req.fullpath.split('/').slice(-1)[0]
  req.parent_path = req.fullpath.split('/').slice(0,-1).join('/')
  if(req.label[0] === '.') return res.status(412).send(null)
  next()
}

export default preconditions
